<script>
	import Table from '$lib/components/shared/Table.svelte';
	import reportService from '$lib/services/ReportService.js';
	import { onMount } from 'svelte';
	import { pdfHeaders, t } from '$lib/stores/stores.js';
	import dayjs from 'dayjs';
	import { generatePDF } from '$lib';
	import DownloadPdfButton from '$lib/components/shared/DownloadPDFButton.svelte';
	import Title from '$lib/components/shared/Title.svelte';

	onMount(() => {
		refreshItems();
	});

	const tableName = 'Reporte 9';
	const reportName = 'Listado de los estudiantes repitentes por año';
	let service = reportService.getInstance();
	let dataBySchoolYear = [];

	async function downloadReport9() {
		const headers = Object.fromEntries(
			Object.entries($pdfHeaders.find(({ reportName }) => reportName === tableName).headers).map(
				([key, value]) => [key, $t(value)]
			)
		);
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

		generatePDF(
			reportData,
			$t(`Reporte #9: ${reportName}`) + ` \n${dayjs().format('YYYY-MMM-DD')}`,
			false,
			true
		);
	}

	const refreshItems = () => {
		service.report9().then((i) => {
			dataBySchoolYear = i;
		});
	};
</script>

<section>
	<Title>{$t(reportName)}</Title>
	{#if dataBySchoolYear.length > 0}
		<DownloadPdfButton on:click={downloadReport9} />
		{#each dataBySchoolYear as schoolYearData}
			<section class="mt-6 mx-3" key={schoolYearData.schoolYear}>
				<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
					{$t('Curso')}: {schoolYearData.schoolYear}
				</h2>
				{#if schoolYearData.years}
					{#each schoolYearData.years as yearData}
						<section class="mt-4" key={`${schoolYearData.schoolYear}-${yearData.year}`}>
							<h3
								class="font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg"
							>
								{$t('Año')}: {yearData.year}
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
