<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';
    export let tableName;
	let openModal = false;
	const handleCancel = () => {
		alert('Clicked cancel');
	};
	const handleDelete = () => {
		alert('Clicked delete');
	};
</script>

<Modal title="" bind:open={openModal} autoclose size="sm" class="w-full">
	<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
	<p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
        ¿Está seguro que desea eliminar {tableName}?
	</p>
	<div class="flex justify-center items-center space-x-4">
		<Button color="light" on:click={handleCancel}>No, cancelar</Button>
		<Button color="red" on:click={handleDelete}>Sí, estoy seguro</Button>
	</div>
</Modal>
