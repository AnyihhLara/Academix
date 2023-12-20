<script>
	import Table from '$lib/components/shared/Table.svelte';
	import reportService from '$lib/services/ReportService.js';
	import { onMount } from 'svelte';
	import { pdfHeaders } from '$lib/stores/stores.js';
	import { Button } from 'flowbite-svelte';
	import dayjs from 'dayjs';
	import { generatePDF } from '$lib';

	onMount(() => {
		refreshItems();
	});

	const tableName = 'Reporte 9';
	const reportName = 'Listado de los estudiantes repitentes por año';
	let service = reportService.getInstance();
	let dataBySchoolYear = [];

	async function downloadReport9() {
		const headers = ($pdfHeaders.find(({ reportName }) => reportName === tableName)).headers;
		const reportData = dataBySchoolYear.flatMap((dataItem) =>
			dataItem.years.map((yearData) => {
				const repeat_students = yearData.repeat_students.map((studentData) => ({
					...studentData,
					schoolYear: dataItem.schoolYear,
					year: yearData.year
				}));

				return repeat_students.map((student) =>
					Object.fromEntries(
						Object.entries(student).map(([key, value]) => [headers[key] || key, value])
					)
				);
			})
		);
		console.log(reportData);

		generatePDF(reportData, `Reporte #9: ${reportName} \n${dayjs().format('YYYY-MMM-DD')}`, false, true);
	}

	const refreshItems = () => {
		service.report9().then((i) => {
			dataBySchoolYear = i;
		});
	};
</script>

<section>
	<h1 class='text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100'>
		{reportName}
	</h1>
	{#if dataBySchoolYear.length > 0}
		<div class='flex justify-end pr-8'>
			<Button on:click={downloadReport9} size='sm'>Descargar PDF</Button>
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
								items={yearData.repeat_students}
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
