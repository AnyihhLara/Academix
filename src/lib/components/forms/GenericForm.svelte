<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { EditOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	export let action, tableName, createItem, updateItem, deleteItem, resetForm;
	let tittle,
		nameBtnModal,
		openModal = false;

	if (action === 'Create') {
		tittle = `Añadir ${tableName}`;
		nameBtnModal = 'Añadir';
	} else if (action === 'Update') {
		tittle = `Modificar ${tableName}`;
		nameBtnModal = 'Modificar';
	} else if (action === 'Delete') {
		tittle = `Modificar ${tableName}`;
		nameBtnModal = 'Eliminar';
	}
	function handleSubmit() {
		if (action === 'Create') {
			createItem();
			openModal = false;
		} else if (action === 'Update') {
			updateItem();
			openModal = false;
		}
		resetForm();
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
	<Modal title="" bind:open={openModal} autoclose size="sm" class="w-full">
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
			¿Está seguro que desea eliminar {tableName}?
		</p>
		<div class="flex justify-center items-center space-x-4">
			<Button color="red" on:click={handleDelete}>Sí, estoy seguro</Button>
			<Button color="light" on:click={handleCancel}>No, cancelar</Button>
		</div>
	</Modal>
{:else}
	<Modal {tittle} bind:open={openModal} class="min-w-full">
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
