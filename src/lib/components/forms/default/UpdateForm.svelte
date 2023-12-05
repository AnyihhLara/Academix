<script>
	import { Button } from 'flowbite-svelte';
	import DefaultForm from './DefaultForm.svelte';

	export let tableName,
		handleUpdate,
		openModal = false;
	let defaultName = `Modificar ${tableName}`;
</script>

<DefaultForm tittle={defaultName} nameModalBtn="Modificar" {openModal} on:submit={handleUpdate}>
	<slot />
	<svelte:fragment slot="btn">
		<Button type="submit" size="md">Modificar</Button>
	</svelte:fragment>
</DefaultForm>
