<script>
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import DefaultForm from './DefaultForm.svelte';
	import { Button } from 'flowbite-svelte';

	export let tableName,
		handleSubmit,
		openModal = false;
	let defaultName = `Añadir ${tableName}`;
</script>

<DefaultForm tittle={defaultName} nameModalBtn="Añadir" {openModal} on:submit={handleSubmit} >
	<slot />
	<svelte:fragment slot="btn">
		<Button type="submit" size="md"><PlusIcon /> Añadir</Button>
	</svelte:fragment>
</DefaultForm>
