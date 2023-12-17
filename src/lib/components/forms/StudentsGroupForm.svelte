<script>
	import { Label, NumberInput, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import yearService from '$lib/services/YearService.js';
	import { currentSchoolYear } from '$lib/stores/stores.js';

	onMount(async () => {
		if (action === 'Create') {
			let yearServ = yearService.getInstance();
			years = await yearServ.getYears();
			years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
			years = years.map(({ year_id, year }) => ({ value: year_id, name: year }));
		}
	});

	export let action;
	export let item = null;
	let tableName = 'grupo de estudiantes',
		defaultClass = 'mt-2',
		studentsGroup = { year: 0, number: 0 };
	let years = [];
	let studentsGroupServ = studentsGroupService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await studentsGroupServ.createStudentsGroup(
			studentsGroup.year,
			studentsGroup.number
		);
		dispatch('created');
	}

	async function updateItem() {
		await studentsGroupServ.updateStudentsGroup(
			item.year_id,
			item.group_id,
			studentsGroup.number
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await studentsGroupServ.deleteStudentsGroup(
			item.year_id,
			item.group_id
		);
		dispatch('deleted');
	}

	function resetForm() {
		studentsGroup = { year: 0, number: 0 };
	}

</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	{#if action === 'Create'}
		<div>
			<Label
			>Año
				<Select
					bind:value={studentsGroup.year}
					class={defaultClass}
					items={years}
					placeholder='Selecciona el año académico al que pertenece el grupo'
					required
				/>
			</Label>
		</div>
	{/if}
	<div>
		<Label for='number'
		>Número
			<NumberInput bind:value={studentsGroup.number} class={defaultClass} id='number' required />
		</Label>
	</div>
</GenericForm>
