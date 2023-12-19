<script>
	import { Input, Label, NumberInput } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import yearService from '$lib/services/YearService.js';
	import { createEventDispatcher } from 'svelte';
	import { currentSchoolYear } from '$lib/stores/stores.js';

	export let action;
	export let item = null;
	let tableName = 'año',
		defaultClass = 'mt-2',
		year = { academicYear: 0, schoolYear: $currentSchoolYear };
	let yearServ = yearService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await yearServ.createYear(year.academicYear, year.schoolYear);
		dispatch('created');
	}

	async function updateItem() {
		await yearServ.updateYear(item.year_id, year.academicYear, year.schoolYear);
		dispatch('updated');
	}

	async function deleteItem() {
		await yearServ.deleteYear(item.year_id);
		dispatch('deleted');
	}

	function resetForm() {
		year = { academicYear: 0, schoolYear: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="year"
			>Año
			<NumberInput id="year" class={defaultClass} bind:value={year.academicYear} required />
		</Label>
	</div>
	<div>
		<Label for="schoolYear" color="disabled"
			>Curso escolar
			<Input
				type="text"
				id="schoolYear"
				placeholder="Curso escolar del año"
				class={defaultClass}
				bind:value={year.schoolYear}
				required
				disabled
				readonly
			/>
		</Label>
	</div>
</GenericForm>
