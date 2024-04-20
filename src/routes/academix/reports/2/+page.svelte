<script>
	import Table from '$lib/components/shared/Table.svelte';
	import reportService from '$lib/services/ReportService.js';
	import { onMount } from 'svelte';
	import dayjs from 'dayjs';
	import { generatePDF } from '$lib';
	import { pdfHeaders, t } from '$lib/stores/stores.js';
	import DownloadPdfButton from '$lib/components/shared/DownloadPDFButton.svelte';
	import Title from '$lib/components/shared/Title.svelte';

	onMount(() => {
		refreshItems();
	});

	const tableName = 'Reporte 2';
	const reportName = 'Listado de las asignaturas por año';
	let service = reportService.getInstance();
	let dataBySchoolYear = [];

	async function downloadReport2() {
		const headers = Object.fromEntries(
			Object.entries($pdfHeaders.find(({ reportName }) => reportName === tableName).headers).map(
				([key, value]) => [key, $t(value)]
			)
		);
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

		generatePDF(
			reportData,
			$t(`Reporte #2: ${reportName}`) + `\n${dayjs().format('YYYY-MMM-DD')}`,
			false,
			true
		);
	}

	const refreshItems = () => {
		service.report2().then((i) => {
			dataBySchoolYear = i;
		});
	};
</script>

<section class="pb-10">
	<Title>{$t(reportName)}</Title>
	{#if dataBySchoolYear.length > 0}
		<DownloadPdfButton on:click={downloadReport2} />
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
