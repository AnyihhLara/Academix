<script>
	import Table from '$lib/components/shared/Table.svelte';
	import reportService from '$lib/services/ReportService.js';
	import { onMount } from 'svelte';
	import { Button } from 'flowbite-svelte';
	import dayjs from 'dayjs';
	import { generatePDF } from '$lib';
	import { pdfHeaders } from '$lib/stores/stores.js';

	onMount(() => {
		refreshItems();
	});

	const tableName = 'Reporte 2';
	const reportName = 'Listado de las asignaturas por año';
	let service = reportService.getInstance();
	let dataBySchoolYear = [];

	async function downloadReport2() {
		const headers = ($pdfHeaders.find(({ reportName }) => reportName === tableName)).headers;
		const reportData = dataBySchoolYear.flatMap((schoolYearData) =>
			schoolYearData.years.map((yearData) => {
				const subjects = yearData.subjects.map((subjectData) => ({
					...subjectData,
					schoolYear: schoolYearData.schoolYear,
					year: yearData.year
				}));

				return subjects.map((subject) =>
					Object.fromEntries(
						Object.entries(subject).map(([key, value]) => [headers[key] || key, value])
					)
				);
			})
		);

		generatePDF(reportData, `Reporte #2: ${reportName} \n${dayjs().format('YYYY-MMM-DD')}`, false, true);
	}

	const refreshItems = () => {
		service.report2().then((i) => {
			dataBySchoolYear = i;
		});
	};
</script>

<section class='pb-10'>
	<h1 class='text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100'>
		{reportName}
	</h1>
	{#if dataBySchoolYear.length > 0}
		<div class='flex justify-end pr-8'>
			<Button on:click={downloadReport2} size='sm'>Descargar PDF</Button>
		</div>
		{#each dataBySchoolYear as schoolYearData}
			<section class='mt-6 mx-3' key={schoolYearData.schoolYear}>
				<h2 class='font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl'>
					Curso: {schoolYearData.schoolYear}
				</h2>
				{#if schoolYearData.years}
					{#each schoolYearData.years as yearData}
						<section class='mt-4' key={`${schoolYearData.schoolYear}-${yearData.year}`}>
							<h3
								class='font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg'
							>
								Año: {yearData.year}
							</h3>
							<Table
								{tableName}
								items={yearData.subjects}
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
