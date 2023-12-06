<script>
	import { Button } from 'flowbite-svelte';
	import DefaultForm from './DefaultForm.svelte';
	import { EditOutline } from 'flowbite-svelte-icons';

	export let tableName,
		handleUpdate,
		openModal = false;
	let defaultName = `Modificar ${tableName}`;
</script>

<DefaultForm tittle={defaultName} nameModalBtn="Modificar" {openModal} on:submit={handleUpdate}>
	<svelte:fragment slot="icon-btn"><EditOutline/></svelte:fragment>
	<slot />
	<svelte:fragment slot="btn">
		<Button type="submit" size="md">Modificar</Button>
	</svelte:fragment>
</DefaultForm>
