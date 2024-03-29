<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { EditOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { t } from '$lib/stores/stores.js';

	export let action, tableName, createItem, updateItem, deleteItem, resetForm;
	let title,
		nameBtnModal,
		error = null,
		openModal = false;
	$: {
		if (action === 'Create') {
			title = $t('Añadir') + ' ' + $t(tableName);
			nameBtnModal = 'Añadir';
		} else if (action === 'Update') {
			title = $t('Modificar') + ' ' + $t(tableName);
			nameBtnModal = 'Modificar';
		} else if (action === 'Delete') {
			title = $t('Eliminar') + ' ' + $t(tableName);
			nameBtnModal = 'Eliminar';
		}
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
	async function handleDelete() {
		try {
			await deleteItem();
			openModal = false;
		} catch (e) {
			error = e.message;
		}
	}
	function handleCancel() {
		openModal = false;
	}
</script>

<Button size="sm" on:click={() => (openModal = true)} class="gap-2">
	{$t(nameBtnModal)}
</Button>
{#if action === 'Delete'}
	<Modal {title} bind:open={openModal} autoclose size="sm" class="w-full">
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
			{$t('¿Está seguro que desea eliminar el/la')}
			{$t(tableName)}?
		</p>
		<div class="flex justify-center items-center space-x-4">
			<Button color="red" on:click={handleDelete}>{$t('Sí, estoy seguro')}</Button>
			<Button color="light" on:click={handleCancel}>{$t('No, cancelar')}</Button>
		</div>
	</Modal>
{:else}
	<Modal {title} bind:open={openModal} on:close={resetForm} class="min-w-full">
		<form on:submit|preventDefault={handleSubmit} autocomplete="off">
			<div class="grid gap-4 mb-4">
				<slot />
			</div>
			<div class="flex justify-center items-center w-full">
				{#if action === 'Create'}
					<Button type="submit" size="md"><PlusIcon />{$t(nameBtnModal)}</Button>
				{:else if action === 'Update'}
					<Button type="submit" size="md"><EditOutline class="mr-1" /> {$t(nameBtnModal)}</Button>
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
		{$t(error)}
	</div>
	<svelte:fragment slot="footer">
		<Button on:click={() => (error = null)} color="red">OK</Button>
	</svelte:fragment>
</Modal>
