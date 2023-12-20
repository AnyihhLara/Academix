<script>
	import { Input, Label } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import academicSituationService from '$lib/services/AcademicSituationService.js';
	import { createEventDispatcher, onMount } from 'svelte';

	onMount(() => resetForm());

	export let action;
	export let item = null;
	let tableName = 'situación académica',
		defaultClass = 'mt-2',
		academicSituation = { name: '' };
	let academicSituationServ = academicSituationService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await academicSituationServ.createAcademicSituation(academicSituation.name);
		dispatch('created');
	}

	async function updateItem() {
		await academicSituationServ.updateAcademicSituation(
			item.academic_situation_id,
			academicSituation.name
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await academicSituationServ.deleteAcademicSituation(item.academic_situation_id);
		dispatch('deleted');
	}

	async function resetForm() {
		console.log('reset');
		if (item) {
			let { academic_situation_id, academic_situation_name } =
				await academicSituationServ.getAcademicSituation(item.academic_situation_id);
			item.academic_situation_id = academic_situation_id;
			item.academic_situation_name = academic_situation_name;
			console.log(item);
			academicSituation.name = item.academic_situation_name;
		} else {
			academicSituation = { name: '' };
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for="name"
			>Nombre
			<Input
				bind:value={academicSituation.name}
				class={defaultClass}
				id="name"
				placeholder="Nombre de la situación académica"
				required
				type="text"
			/>
		</Label>
	</div>
</GenericForm>
