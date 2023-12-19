<script>
	import { onMount } from 'svelte';
	import reportService from '$lib/services/ReportService.js';
	import { Label, Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import studentService from '$lib/services/StudentService.js';

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

	let tableName = 'Reporte 6';
	let selectedOption = '',
		options = [];
	let service = reportService.getInstance();

	let student;

	const refreshItems = () => {
		service.report6(selectedOption).then((i) => {
			student = i;
		});
	};
</script>

<section class="px-2 pt-3 pb-8">
	<div class="flex items-center justify-between mx-5 mt-1 gap-4">
		<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
			Certificación de notas
		</h1>
		<div class="flex items-center gap-2">
			<Label>Estudiante:</Label>
			<Select
				bind:value={selectedOption}
				class="w-96 h-10 mt-1"
				items={options}
				placeholder="Seleccione un estudiante:"
				on:change={() => {
					selectedOption = event.target.value;
					refreshItems();
				}}
			/>
		</div>
	</div>
	{#if student}
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
							Año {year.year} Curso {year.school_year}
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
