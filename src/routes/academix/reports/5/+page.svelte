<script>
	import { Button, Label, Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';
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

	const tableName = 'Reporte 5';
	const reportName = 'Escalafón';
	let service = reportService.getInstance();
	let selectedYear,
		selectedGroup = null;
	let years, groups, selectableGroups, dataByYear, dataByGroup;

	$: if (selectedYear || selectedGroup) {
		selectableGroups = groups.filter(({ year }) => year === selectedYear);
		selectableGroups = selectableGroups.map(({ group_number }) => ({
			value: group_number,
			name: group_number
		}));
		selectableGroups = [...selectableGroups, { value: null, name: 'ninguno' }];
		refreshItems();
	}

	async function downloadReport5() {
		const headers = ($pdfHeaders.find(({ reportName }) => reportName === tableName)).headers;
		let data;

		if (dataByGroup) data = dataByGroup;
		else if (dataByYear) data = dataByYear;

		const reportData = [data.students.map((studentData) => {
			return {
				...studentData,
				schoolYear: data.school_year,
				year: data.year,
				group_number: data.group_number
			};
		}).map((student) =>
			Object.fromEntries(
				Object.entries(student).map(([key, value]) => [headers[key] || key, value])
			)
		)];


		generatePDF(reportData, `Reporte #5: ${reportName} \n${dayjs().format('YYYY-MMM-DD')}`, false, true);
	}

	const refreshItems = () => {
		if (selectedYear && selectedGroup === null) {
			dataByGroup = null;
			service.report5(selectedYear, selectedGroup).then((i) => {
				dataByYear = i;
			});
		} else if (selectedYear && selectedGroup !== null) {
			service.report5(selectedYear, selectedGroup).then((i) => {
				dataByGroup = i;
			});
		} else dataByYear = null;
	};
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
						class='w-96 h-10 mt-1'
					/>
				</div>
			{/if}
		{/if}
	</div>
	{#if selectedYear && !selectedGroup && dataByYear}
		<div class='flex justify-end pr-6 pt-4'>
			<Button on:click={downloadReport5} size='sm'>Descargar PDF</Button>
		</div>
		<section class='mt-4 mx-3'>
			<h2 class='font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl'>
				Curso: {dataByYear.school_year} Año: {dataByYear.year}
			</h2>
			<Table
				{tableName}
				items={dataByYear.students}
				isCreatable={false}
				isUpdatable={false}
				isDeletable={false}
				isNamed={false}
				{refreshItems}
			/>
		</section>
	{:else if selectedYear && selectedGroup && dataByGroup}
		<div class='flex justify-end pr-6 pt-4'>
			<Button on:click={downloadReport5} size='sm'>Descargar PDF</Button>
		</div>
		<section class='mt-4 mx-3'>
			<h2 class='font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl'>
				Curso: {dataByGroup.school_year} Año: {dataByGroup.year} Grupo: {dataByGroup.group_number}
			</h2>
			<Table
				{tableName}
				items={dataByGroup.students}
				isCreatable={false}
				isUpdatable={false}
				isDeletable={false}
				isNamed={false}
				{refreshItems}
			/>
		</section>
	{/if}
</section>
