<script>
	import { Input, Label, NumberInput } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import yearService from '$lib/services/YearService.js';
	import { createEventDispatcher } from 'svelte';
	import { currentSchoolYear, t } from '$lib/stores/stores.js';

	export let action;
	export let item = null;
	let tableName = 'Año',
		defaultClass = 'mt-2',
		year = { academicYear: null, schoolYear: $currentSchoolYear };
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
		year = { academicYear: null, schoolYear: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="year"
			>{$t('Año')}
			<NumberInput id="year" class={defaultClass} bind:value={year.academicYear} required />
		</Label>
	</div>
	<div>
		<Label for="schoolYear" color="disabled"
			>{$t('Curso escolar')}
			<Input
				type="text"
				id="schoolYear"
				placeholder={$t('Curso escolar del año')}
				class={defaultClass}
				bind:value={year.schoolYear}
				required
				disabled
				readonly
			/>
		</Label>
	</div>
</GenericForm>
