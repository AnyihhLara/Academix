<script>
	import { Button, Modal } from 'flowbite-svelte';
	import { ExclamationCircleOutline } from 'flowbite-svelte-icons';

	export let showDeleteModal;
	export let activityToDelete;
</script>

<Modal bind:open={showDeleteModal} size="xs" autoclose on:close>
	<div class="text-center">
		<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
		<h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
			¿Está seguro de que desea eliminar la actividad deportiva "{activityToDelete.name}"?
		</h3>
		<Button color="red" class="mr-2" on:click>Si, estoy seguro</Button>
		<Button color="alternative">No, cancelar</Button>
	</div>
</Modal>
