<script>
	import { Button, Label, Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import reportService from '$lib/services/ReportService.js';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import yearService from '$lib/services/YearService.js';
	import { currentSchoolYear, pdfHeaders } from '$lib/stores/stores.js';
	import { generatePDF } from '$lib';
	import dayjs from 'dayjs';

	onMount(async () => {
		let yearServ = yearService.getInstance();
		let studentsGroupServ = studentsGroupService.getInstance();
		years = await yearServ.getYears();
		years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
		years = years.map(({ year }) => ({ value: year, name: year }));
		groups = await studentsGroupServ.getStudentsGroups();
		refreshItems();
	});

	let tableName = 'Reporte 8 por año';
	const reportName = 'Listado de los estudiantes que causan baja en un curso';
	let service = reportService.getInstance();
	let selectedYear,
		selectedGroup = null;
	let years, groups, selectableGroups, dataByYear, dataByGroup;
	let isDeletable = $page.data.role === 'Secretario';

	$: if (selectedYear || selectedGroup) {
		selectableGroups = groups.filter(({ year }) => year === selectedYear);
		selectableGroups = selectableGroups.map(({ group_number }) => ({
			value: group_number,
			name: group_number
		}));
		selectableGroups = selectableGroups.filter(
			(group, index, self) =>
				index === self.findIndex((t) => t.value === group.value && t.name === group.name)
		);
		selectableGroups = [...selectableGroups, { value: null, name: 'ninguno' }];
		refreshItems();
		setTableName();
	}

	async function downloadReport8() {
		const headers = ($pdfHeaders.find(({ reportName }) => tableName.includes(reportName))).headers;
		let data;
		if (dataByGroup) data = dataByGroup.school_years;
		else if (dataByYear) data = dataByYear.school_years;

		const reportData = [data.flatMap((schoolYearData) => {
				const students = schoolYearData.unenrollment_students.map((student) => ({
					...student,
					schoolYear: schoolYearData.school_year,
					year: schoolYearData.year,
					studentsGroup: schoolYearData.group_number
				}));

				return students.map((student) =>
					Object.fromEntries(
						Object.entries(student).map(([key, value]) => [headers[key] || key, value])
					)
				);
			}
		)];

		generatePDF(reportData, `Reporte #8: ${reportName} \n${dayjs().format('YYYY-MMM-DD')}`, false, true);
	}

	const refreshItems = () => {
		if (selectedYear && selectedGroup === null) {
			service.report8(selectedYear, selectedGroup).then((i) => {
				dataByYear = i;
				dataByGroup = null;
			});
		} else if (selectedYear && selectedGroup !== null) {
			service.report8(selectedYear, selectedGroup).then((i) => {
				dataByGroup = i;
			});
		} else {
			selectedYear = null;
			selectedYear = null;
		}
	};

	function setTableName() {
		if (selectedYear && selectedGroup === null) {
			tableName = 'Reporte 8 por año';
		} else if (selectedYear && selectedGroup !== null) {
			tableName = 'Reporte 8 por grupo';
		}
	}
</script>

<section class='px-2 pt-6 pb-8'>
	<div class='flex items-center justify-between mx-6 gap-4'>
		<h1 class='text-center text-2xl font-semibold text-primary-950 dark:text-primary-100'>
			{reportName}
		</h1>
		{#if years}
			<div class='flex justify-center items-center gap-3'>
				<Label>Año</Label>
				<Select
					placeholder='Seleccione un año:'
					items={years}
					bind:value={selectedYear}
					on:change={setTableName}
					class='w-96 h-10 mt-1'
				/>
			</div>
			{#if selectableGroups}
				<div class='flex justify-center items-center gap-3'>
					<Label>Grupo</Label>
					<Select
						placeholder='Seleccione un grupo:'
						items={selectableGroups}
						bind:value={selectedGroup}
						on:change={setTableName}
						class='w-96 h-10 mt-1'
					/>
				</div>
			{/if}
		{/if}
	</div>
	{#if selectedYear && !selectedGroup && dataByYear}
		<section class='mt-6 mx-3'>
			{#if dataByYear.school_years}
				<div class='flex justify-end pr-4'>
					<Button on:click={downloadReport8} size='sm'>Descargar PDF</Button>
				</div>
				{#each dataByYear.school_years as data}
					<h2 class='font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl'>
						Curso: {data.school_year} Año: {data.year}
					</h2>

					<Table
						{tableName}
						items={data.unenrollment_students}
						isCreatable={false}
						isUpdatable={false}
						{isDeletable}
						isNamed={false}
						{refreshItems}
					/>
				{/each}
			{/if}
		</section>
	{:else if selectedYear && selectedGroup && dataByGroup}
		<section class='mt-6 mx-3'>
			{#if dataByGroup.school_years}
				<div class='flex justify-end pr-4'>
					<Button on:click={downloadReport8} size='sm'>Descargar PDF</Button>
				</div>
				{#each dataByGroup.school_years as data}
					<h2 class='font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl'>
						Curso: {data.school_year} Año: {data.year} Grupo: {data.group_number}
					</h2>
					<Table
						{tableName}
						items={data.unenrollment_students}
						isCreatable={false}
						isUpdatable={false}
						{isDeletable}
						isNamed={false}
						{refreshItems}
					/>
				{/each}
			{/if}
		</section>
	{/if}
</section>
