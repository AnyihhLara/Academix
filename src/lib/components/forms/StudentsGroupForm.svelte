<script>
	import { Label, NumberInput, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import yearService from '$lib/services/YearService.js';
	import { currentSchoolYear, t } from '$lib/stores/stores.js';

	onMount(async () => {
		if (action === 'Create') {
			let yearServ = yearService.getInstance();
			years = await yearServ.getYears();
			years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
			years = years.map(({ year_id, year }) => ({ value: year_id, name: year }));
		}
		await resetForm();
	});

	export let action;
	export let item = null;
	let tableName = 'Grupo de estudiantes',
		defaultClass = 'mt-2',
		studentsGroup = { year: null, number: null };
	let years = [];
	let studentsGroupServ = studentsGroupService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await studentsGroupServ.createStudentsGroup(studentsGroup.year, studentsGroup.number);
		dispatch('created');
	}

	async function updateItem() {
		await studentsGroupServ.updateStudentsGroup(item.year_id, item.group_id, studentsGroup.number);
		dispatch('updated');
	}

	async function deleteItem() {
		await studentsGroupServ.deleteStudentsGroup(item.year_id, item.group_id);
		dispatch('deleted');
	}

	async function resetForm() {
		if (item) {
			let { group_number } = await studentsGroupServ.getStudentsGroup(item.group_id, item.year_id);
			item.group_number = group_number;

			studentsGroup.year = item.year_id;
			studentsGroup.number = item.group_number;
		} else {
			studentsGroup = { year: null, number: null };
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	{#if action === 'Create'}
		<div>
			<Label
				>{$t('Año')}
				<Select
					bind:value={studentsGroup.year}
					class={defaultClass}
					items={years}
					placeholder={$t('Selecciona el año académico al que pertenece el grupo')}
					required
				/>
			</Label>
		</div>
	{/if}
	<div>
		<Label for="number"
			>{$t('Número')}
			<NumberInput bind:value={studentsGroup.number} class={defaultClass} id="number" required />
		</Label>
	</div>
</GenericForm>
