<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { onMount } from 'svelte';
	import reportService from '$lib/services/ReportService.js';
	import { Button } from 'flowbite-svelte';
	import dayjs from 'dayjs';
	import { generatePDF } from '$lib';
	import { pdfHeaders } from '$lib/stores/stores.js';

	onMount(() => {
		refreshItems();
	});

	const tableName = 'Reporte 3';
	const reportName = 'Listado de las evaluaciones por grupo en cada asignatura';
	let service = reportService.getInstance();
	let dataBySchoolYear = [];

	async function downloadReport3() {
		const headers = $pdfHeaders.find(({ reportName }) => reportName === tableName).headers;
		const reportData = dataBySchoolYear.flatMap((schoolYearData) =>
			schoolYearData.years.flatMap((yearData) =>
				yearData.subjects.flatMap((subjectData) =>
					subjectData.studentsGroups.map((groupData) => {
						const evaluations = groupData.evaluations.map((evaluationData) => ({
							...evaluationData,
							schoolYear: schoolYearData.schoolYear,
							year: yearData.year,
							subject: subjectData.subject,
							studentsGroup: groupData.studentsGroup
						}));

						return evaluations.map((evaluation) =>
							Object.fromEntries(
								Object.entries(evaluation).map(([key, value]) => [headers[key] || key, value])
							)
						);
					})
				)
			)
		);

		generatePDF(
			reportData,
			`Reporte #3: ${reportName} \n${dayjs().format('YYYY-MMM-DD')}`,
			false,
			true
		);
	}

	const refreshItems = () => {
		service.report3().then((i) => {
			dataBySchoolYear = i;
		});
	};
</script>

<section class="pb-10">
	<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
		{reportName}
	</h1>
	{#if dataBySchoolYear.length > 0}
		<div class="flex justify-end pr-8">
			<Button on:click={downloadReport3} size="sm">Descargar PDF</Button>
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
							{#if yearData.subjects}
								{#each yearData.subjects as subjectData}
									<section
										class="mt-4"
										key={`${schoolYearData.schoolYear}-${yearData.year}-${subjectData.subject}`}
									>
										<h4
											class="font-bold block mb-2 ml-6 text-secondary-800 dark:text-secondary-100 text-md"
										>
											Asignatura: {subjectData.subject}
										</h4>
										{#if subjectData.studentsGroups}
											{#each subjectData.studentsGroups as studentsGroupData}
												<section
													class="mt-4"
													key={`${schoolYearData.schoolYear}-${yearData.year}-${subjectData.subject}-${studentsGroupData.studentsGroup}`}
												>
													<h5
														class="font-bold block mb-2 ml-8 text-secondary-750 dark:text-secondary-100 text-sm"
													>
														Grupo: {studentsGroupData.studentsGroup}
													</h5>
													<Table
														{tableName}
														items={studentsGroupData.evaluations}
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
		{/each}
	{/if}
</section>
