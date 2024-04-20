<script>
	import { onMount } from 'svelte';
	import reportService from '$lib/services/ReportService.js';
	import { Label, Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import studentService from '$lib/services/StudentService.js';
	import { pdfHeaders, t } from '$lib/stores/stores.js';
	import { generatePDF } from '$lib';
	import dayjs from 'dayjs';
	import DownloadPdfButton from '$lib/components/shared/DownloadPDFButton.svelte';
	import Title from '$lib/components/shared/Title.svelte';

	onMount(() => {
		refreshItems();
		refreshOptions();
	});
	let studentServ = studentService.getInstance();

	async function refreshOptions() {
		options = await studentServ.getStudents();
		options = options.map(({ student_code }) => ({
			value: student_code,
			name: student_code
		}));
	}

	const tableName = 'Reporte 6';
	const reportName = 'Certificación de notas';
	let selectedOption = '',
		options = [];
	let service = reportService.getInstance();
	let student;

	async function downloadReport6() {
		const headers = Object.fromEntries(
			Object.entries($pdfHeaders.find(({ reportName }) => reportName === tableName).headers).map(
				([key, value]) => [key, $t(value)]
			)
		);
		const reportData = student.years.map((yearData) => {
			const subjects = yearData.subjects.map((subjectData) => ({
				...subjectData,
				student_name: student.student_name,
				student_lastname: student.student_lastname,
				year: yearData.year,
				school_year: yearData.school_year
			}));

			return subjects.map((subject) =>
				Object.fromEntries(
					Object.entries(subject).map(([key, value]) => [headers[key] || key, value])
				)
			);
		});

		generatePDF(
			reportData,
			$t(`Reporte #6: Estudiante`) +
				` ${student.student_code} ${student.student_name} ${student.student_lastname}: \n` +
				$t(reportName) +
				`\n${dayjs().format('YYYY-MMM-DD')}`,
			false,
			true
		);
	}

	const refreshItems = () => {
		service.report6(selectedOption).then((i) => {
			student = i;
		});
	};
</script>

<section class="px-2 pt-3 pb-8">
	<div class="flex items-center justify-between mx-5 mt-1 gap-4 pb-4">
		<Title divClass="mt-1">{$t(reportName)}</Title>
		<div class="flex items-center gap-2">
			<Label>{$t('Estudiante')}:</Label>
			<Select
				bind:value={selectedOption}
				class="w-96 h-10 mt-1"
				items={options}
				on:change={() => {
					selectedOption = event.target.value;
					refreshItems();
				}}
				placeholder={$t('Seleccione un estudiante:')}
			/>
		</div>
	</div>
	{#if student}
		<DownloadPdfButton on:click={downloadReport6} />
		<section class="mt-4 mx-3" key={student.student_code}>
			<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
				{student.student_name}
				{student.student_lastname}
			</h2>
			{#if student.years}
				{#each student.years as year}
					<section class="mt-4" key={`${student.student_code}-${year.year}`}>
						<h3
							class="font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg"
						>
							{$t('Año')}
							{year.year}
						</h3>
						<Table
							{tableName}
							items={year.subjects}
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
	{/if}
</section>
