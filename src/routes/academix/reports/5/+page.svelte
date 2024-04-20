<script>
	import { Label, Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import { onMount } from 'svelte';
	import reportService from '$lib/services/ReportService.js';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import yearService from '$lib/services/YearService.js';
	import { currentSchoolYear, pdfHeaders, t } from '$lib/stores/stores.js';
	import { generatePDF } from '$lib';
	import dayjs from 'dayjs';
	import DownloadPdfButton from '$lib/components/shared/DownloadPDFButton.svelte';
	import Title from '$lib/components/shared/Title.svelte';

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
		selectableGroups = selectableGroups.filter(
			(group, index, self) =>
				index === self.findIndex((t) => t.value === group.value && t.name === group.name)
		);
		selectableGroups = [...selectableGroups, { value: null, name: $t('ninguno') }];
		refreshItems();
	}

	async function downloadReport5() {
		const headers = Object.fromEntries(
			Object.entries($pdfHeaders.find(({ reportName }) => reportName === tableName).headers).map(
				([key, value]) => [key, $t(value)]
			)
		);
		let data;

		if (dataByGroup) data = dataByGroup;
		else if (dataByYear) data = dataByYear;

		const reportData = [
			data.students
				.map((studentData) => {
					return {
						...studentData,
						schoolYear: data.school_year,
						year: data.year,
						group_number: data.group_number
					};
				})
				.map((student) =>
					Object.fromEntries(
						Object.entries(student).map(([key, value]) => [headers[key] || key, value])
					)
				)
		];
		generatePDF(
			reportData,
			$t(`Reporte #5: ${reportName}`) + `\n${dayjs().format('YYYY-MMM-DD')}`,
			false,
			true
		);
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

<section class="px-2 pt-6 pb-8">
	<div class="flex items-center justify-between mx-6 gap-4 pb-4">
		<Title divClass="">{$t(reportName)}</Title>
		{#if years}
			<div class="flex justify-center items-center gap-3">
				<Label>{$t('Año')}</Label>
				<Select
					placeholder={$t('Seleccione un año:')}
					items={years}
					bind:value={selectedYear}
					class="w-96 h-10 mt-1"
				/>
			</div>
			{#if selectableGroups}
				<div class="flex justify-center items-center gap-3">
					<Label>{$t('Grupo')}</Label>
					<Select
						placeholder={$t('Seleccione un grupo:')}
						items={selectableGroups}
						bind:value={selectedGroup}
						class="w-96 h-10 mt-1"
					/>
				</div>
			{/if}
		{/if}
	</div>
	{#if selectedYear}
		<DownloadPdfButton on:click={downloadReport5} />
	{/if}

	{#if selectedYear && !selectedGroup && dataByYear}
		<section class="mt-4 mx-3">
			<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
				{$t('Curso')}: {dataByYear.school_year}
				{$t('Año')}: {dataByYear.year}
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
		<section class="mt-4 mx-3">
			<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
				{$t('Curso')}: {dataByGroup.school_year}
				{$t('Año')}: {dataByGroup.year}
				{$t('Grupo')}: {dataByGroup.group_number}
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
