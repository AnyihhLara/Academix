<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { onMount } from 'svelte';
	import subjectService from '$lib/services/SubjectService.js';
	import { page } from '$app/stores';
	import yearService from '$lib/services/YearService.js';
	import { currentSchoolYear } from '$lib/stores/stores.js';

	onMount(async () => {
		let yearServ = yearService.getInstance();
		years = await yearServ.getYears();
		years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
		years = years.map(({ year }) => year);
		filters.find((filter) => filter.key === 'year').options = years;
		refreshItems();
	});

	let subjects = [],
		filters = [{ name: 'Año', key: 'year', options: [], selectedOptions: [] }],
		years,
		isFilterable = true,
		isCreatable = false,
		isUpdatable = false,
		isDeletable = false;
	let tableName = 'Asignaturas';
	let subjectServ = subjectService.getInstance();

	const refreshItems = () => {
		subjectServ.getSubjects().then((i) => {
			subjects = i;
		});
	};
</script>

{#if $page.data.role === 'Secretario'}
	<Table {tableName} items={subjects} {filters} {isFilterable} {refreshItems} {isDeletable} />
{:else}
	<Table
		{tableName}
		items={subjects}
		{filters}
		{isFilterable}
		{isCreatable}
		{isUpdatable}
		{isDeletable}
		{refreshItems}
	/>
{/if}
