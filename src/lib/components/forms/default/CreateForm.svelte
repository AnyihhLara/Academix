<script>
	import PlusIcon from '$lib/components/icons/PlusIcon.svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';
	import DefaultForm from './DefaultForm.svelte';
	import { Button } from 'flowbite-svelte';

	export let tableName,
		handleSubmit,
		openModal = false;
	let defaultName = `Añadir ${tableName}`;
</script>

<DefaultForm tittle={defaultName} nameModalBtn="Añadir" {openModal} on:submit={handleSubmit} >
	<svelte:fragment slot="icon-btn"><PlusOutline class="w-4 h-4"/></svelte:fragment>
	<slot />
	<svelte:fragment slot="btn">
		<Button type="submit" size="md"><PlusIcon /> Añadir</Button>
	</svelte:fragment>
</DefaultForm>
