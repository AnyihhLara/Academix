<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { onMount } from 'svelte';
	import studentService from '$lib/services/StudentService.js';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import yearService from '$lib/services/YearService.js';
	import academicSituationService from '$lib/services/AcademicSituationService.js';
	import { currentSchoolYear } from '$lib/stores/stores.js';
	import { page } from '$app/stores';

	onMount(async () => {
		let yearServ = yearService.getInstance();
		let academicSituationServ = academicSituationService.getInstance();
		let studentsGroupServ = studentsGroupService.getInstance();
		years = await yearServ.getYears();
		years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
		years = years.map(({ year }) => year);
		filters.find((filter) => filter.key === 'year').options = years;
		groups = await studentsGroupServ.getStudentsGroups();
		filters.find((filter) => filter.key === 'group_number').options = groups.map(
			({ group_number }) => group_number
		);
		filters.find((filter) => filter.key === 'group_number').options = filters
			.find((filter) => filter.key === 'group_number')
			.options.filter((group, index, self) => index === self.findIndex((t) => t === group));
		academicSituations = await academicSituationServ.getAcademicSituations();
		academicSituations = academicSituations.map(
			({ academic_situation_name }) => academic_situation_name
		);
		filters.find((filter) => filter.key === 'academic_situation').options = academicSituations;
		refreshItems();
	});

	let students = [],
		filters = [
			{ name: 'Situación académica', key: 'academic_situation', options: [], selectedOptions: [] },
			{ name: 'Año', key: 'year', options: [], selectedOptions: [] },
			{ name: 'Grupo', key: 'group_number', options: [], selectedOptions: [] }
		],
		years,
		groups,
		academicSituations;
	let isFilterable = true,
		isCreatable = false,
		isUpdatable = false,
		isDeletable = false;
	let tableName = 'Estudiantes';
	let studentServ = studentService.getInstance();

	const refreshItems = () => {
		studentServ.getStudents().then((i) => {
			students = i;
		});
	};
</script>

{#if $page.data.user.role === 'Secretario'}
	<Table {tableName} items={students} {filters} {isFilterable} {isDeletable} {refreshItems} />
{:else}
	<Table
		{tableName}
		items={students}
		{filters}
		{isFilterable}
		{isCreatable}
		{isUpdatable}
		{isDeletable}
		{refreshItems}
	/>
{/if}
