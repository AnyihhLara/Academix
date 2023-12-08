<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { EditOutline } from 'flowbite-svelte-icons';
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';

	export let action, tableName, createItem, updateItem, resetForm ;
	let tittle,
		nameBtnModal,
		openModal = false;

	if (action === 'Create') {
		tittle = `Añadir ${tableName}`;
		nameBtnModal = 'Añadir';
	} else if (action === 'Update') {
		tittle = `Modificar ${tableName}`;
		nameBtnModal = 'Modificar';
	}
	function handleSubmit() {
		if (action === 'Create') {
			updateItem();
		} else if (action === 'Update') {
			createItem();
		}
        resetForm();
	}
</script>

<Button size="sm" on:click={() => (openModal = true)} class="gap-2">
	{nameBtnModal}
</Button>
<Modal {tittle} bind:open={openModal} autoclose class="min-w-full">
	<form on:submit|preventDefault={handleSubmit}>
		<div class="grid gap-4 mb-4">
			<slot />
		</div>
		<div class="flex justify-center items-center w-full">
			{#if action === 'Create'}
				<Button type="submit" size="md"><PlusIcon /> Añadir</Button>
			{:else if action === 'Update'}
				<Button type="submit" size="md"><EditOutline class="mr-1"/> Modificar</Button>
			{/if}
		</div>
	</form>
</Modal>
