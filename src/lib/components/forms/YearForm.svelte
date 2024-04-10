<script>
	import { Input, Label, NumberInput } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import yearService from '$lib/services/YearService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { currentSchoolYear, t } from '$lib/stores/stores.js';

	onMount(async () => await resetForm());

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

	async function resetForm() {
		if (item) {
			const new_year = await yearServ.getYear(item.year_id);
			item.year = new_year.year;
			item.school_year = new_year.school_year;

			year.academicYear = item.year;
			year.schoolYear = item.school_year;
		} else {
			year = { academicYear: null, schoolYear: '' };
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for="year"
			>{$t('Año')}
			<NumberInput bind:value={year.academicYear} class={defaultClass} id="year" required />
		</Label>
	</div>
	<div>
		<Label color="disabled" for="schoolYear"
			>{$t('Curso escolar')}
			<Input
				bind:value={year.schoolYear}
				class={defaultClass}
				disabled
				id="schoolYear"
				placeholder={$t('Curso escolar del año')}
				readonly
				required
				type="text"
			/>
		</Label>
	</div>
</GenericForm>
