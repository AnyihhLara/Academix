<script>
	import Table from '$lib/components/shared/Table.svelte';
	import reportService from '$lib/services/ReportService.js';
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import { generatePDF } from '$lib';
	import dayjs from 'dayjs';
	import { pdfHeaders, t } from '$lib/stores/stores.js';

	onMount(() => {
		refreshItems();
	});

	const tableName = 'Reporte 1';
	const reportName = 'Listado de los estudiantes por grupo';
	let service = reportService.getInstance();
	let dataBySchoolYear = [];

	async function downloadReport1() {
		const headers = $pdfHeaders.find(({ reportName }) => reportName === tableName).headers;
		const reportData = dataBySchoolYear.flatMap((schoolYearData) =>
			schoolYearData.years.flatMap((yearData) =>
				yearData.studentsGroups.map((groupData) => {
					const students = groupData.students.map((student) => ({
						...student,
						schoolYear: schoolYearData.schoolYear,
						year: yearData.year,
						studentsGroup: groupData.studentsGroup
					}));

					return students.map((student) =>
						Object.fromEntries(
							Object.entries(student).map(([key, value]) => [headers[key] || key, value])
						)
					);
				})
			)
		);

		generatePDF(
			reportData,
			`Reporte #1: ${reportName} \n${dayjs().format('YYYY-MMM-DD')}`,
			false,
			true
		);
	}

	const refreshItems = () => {
		service.report1().then((i) => {
			dataBySchoolYear = i;
		});
	};
</script>

<section class="pb-10">
	<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
		{$t(reportName)}
	</h1>
	{#if dataBySchoolYear.length > 0}
		<div class="flex justify-end pr-8">
			<Button on:click={downloadReport1} size="sm">{$t('Descargar PDF')}</Button>
		</div>
		{#each dataBySchoolYear as schoolYearData}
			<section class="mt-6 mx-3" key={schoolYearData.schoolYear}>
				<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
					Curso: {schoolYearData.schoolYear}
				</h2>
				{#if schoolYearData.years}
					{#each schoolYearData.years as yearData}
						<section class="mt-4" key={`${schoolYearData.schoolYear}-${yearData.year}`}>
							<h3
								class="font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg"
							>
								Año: {yearData.year}
							</h3>
							{#if yearData.studentsGroups}
								{#each yearData.studentsGroups as studentsGroupData}
									<section
										class="mt-2"
										key={`${schoolYearData.schoolYear}-${yearData.year}-${studentsGroupData.studentsGroup}`}
									>
										<h4
											class="font-bold block mb-1 ml-6 text-secondary-800 dark:text-secondary-100 text-md"
										>
											Grupo: {studentsGroupData.studentsGroup}
										</h4>
										<Table
											{tableName}
											items={studentsGroupData.students}
											isCreatable={false}
											isUpdatable={false}
											isDeletable={false}
											isNamed={false}
											{refreshItems}
										/>
									</section>
								{/each}
							{/if}
						</section>
					{/each}
				{/if}
			</section>
		{/each}
	{/if}
</section>
