<script>
	import { Input, Label, NumberInput, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import subjectService from '$lib/services/SubjectService.js';
	import yearService from '$lib/services/YearService.js';
	import { currentSchoolYear, t } from '$lib/stores/stores.js';

	onMount(async () => {
		if (action !== 'Delete') {
			let yearServ = yearService.getInstance();
			years = await yearServ.getYears();
			years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
			years = years.map(({ year_id, year }) => ({ value: year_id, name: year }));
		}
		await resetForm();
	});

	export let action;
	export let item = null;
	let tableName = 'Asignatura',
		defaultClass = 'mt-2',
		subject = { name: '', plannedHours: 0, year: 0 };
	let years;
	let subjectServ = subjectService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await subjectServ.createSubject(subject.name, subject.plannedHours, subject.year);
		dispatch('created');
	}

	async function updateItem() {
		await subjectServ.updateSubject(
			item.subject_id,
			subject.name,
			subject.plannedHours,
			subject.year
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await subjectServ.deleteSubject(item.subject_id);
		dispatch('deleted');
	}

	async function resetForm() {
		console.log('reset');
		if (item) {
			let { subject_id, subject_name, planned_hours, year } = await subjectServ.getSubject(
				item.subject_id
			);
			item.subject_id = subject_id;
			item.subject_name = subject_name;
			item.planned_hours = planned_hours;
			item.year = year;
			console.log(item);
			subject.name = item.subject_name;
			subject.plannedHours = item.planned_hours;
			subject.year = item.year;
		} else {
			subject = { name: '', plannedHours: 0, year: 0 };
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for="name"
			>{$t('Nombre')}
			<Input
				bind:value={subject.name}
				class={defaultClass}
				id="name"
				placeholder={$t('Nombre de la asignatura')}
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<Label for="plannedHours"
			>Horas planificadas
			<NumberInput
				bind:value={subject.plannedHours}
				class={defaultClass}
				id="plannedHours"
				required
			/>
		</Label>
	</div>

	<div>
		<Label
			>{$t('Año')}
			<Select
				bind:value={subject.year}
				class={defaultClass}
				items={years}
				placeholder={$t('Selecciona el año académico de la asignatura')}
				required
			/>
		</Label>
	</div>
</GenericForm>
