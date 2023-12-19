<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { EditOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	export let action, tableName, createItem, updateItem, deleteItem, resetForm;
	let title,
		nameBtnModal,
		error = null,
		openModal = false;

	if (action === 'Create') {
		title = `Añadir ${tableName}`;
		nameBtnModal = 'Añadir';
	} else if (action === 'Update') {
		title = `Modificar ${tableName}`;
		nameBtnModal = 'Modificar';
	} else if (action === 'Delete') {
		title = `Eliminar ${tableName}`;
		nameBtnModal = 'Eliminar';
	}
	async function handleSubmit() {
		if (action === 'Create') {
			try {
				await createItem();
				openModal = false;
				await resetForm();
			} catch (e) {
				error = e.message;
			}
		} else if (action === 'Update') {
			try {
				await updateItem();
				openModal = false;
				await resetForm();
			} catch (e) {
				error = e.message;
			}
		}
	}
	function handleDelete() {
		deleteItem();
		openModal = false;
	}
	function handleCancel() {
		openModal = false;
	}
</script>

<Button size="sm" on:click={() => (openModal = true)} class="gap-2">
	{nameBtnModal}
</Button>
{#if action === 'Delete'}
	<Modal {title} bind:open={openModal} autoclose size="sm" class="w-full">
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
			¿Está seguro que desea eliminar el/la {tableName}?
		</p>
		<div class="flex justify-center items-center space-x-4">
			<Button color="red" on:click={handleDelete}>Sí, estoy seguro</Button>
			<Button color="light" on:click={handleCancel}>No, cancelar</Button>
		</div>
	</Modal>
{:else}
	<Modal {title} bind:open={openModal} class="min-w-full">
		<form on:submit|preventDefault={handleSubmit} autocomplete="off">
			<div class="grid gap-4 mb-4">
				<slot />
			</div>
			<div class="flex justify-center items-center w-full">
				{#if action === 'Create'}
					<Button type="submit" size="md"><PlusIcon /> Añadir</Button>
				{:else if action === 'Update'}
					<Button type="submit" size="md"><EditOutline class="mr-1" /> Modificar</Button>
				{/if}
			</div>
		</form>
	</Modal>
{/if}
<Modal
	title="Error"
	bind:open={error}
	color="red"
	size="xs"
	autoclose
	on:close={() => (error = null)}
>
	<div class="text-base leading-relaxed">
		{error}
	</div>
	<svelte:fragment slot="footer">
		<Button on:click={() => (error = null)} color="red">OK</Button>
	</svelte:fragment>
</Modal>
