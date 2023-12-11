<script>
	import Table from '$lib/components/shared/Table.svelte';

	let tableName = 'Reporte 6';
	function refreshItems() {}
	let students = [
		{
			student_name: 'Juan',
			lastname: 'Perez',
			years: [
				{
					year: '1',
					schoolYear: '2022-2023',
					subjects: [
						{ subject: 'Matemática 1', grade: 'Aprobado', average: 3.2 },
						{ subject: 'Matemática Discreta', grade: 'Bien', average: 4.4 }
					]
				},
				{
					year: '2',
					schoolYear: '2023-2024',
					subjects: [
						{ subject: 'Física', grade: 'Excelente', average: 4.9 },
						{ subject: 'Álgebra Lineal', grade: 'Aprobado', average: 3.8 }
					]
				},
				{
					year: '3',
					schoolYear: '2024-2025',
					subjects: [
						{ subject: 'Cálculo Avanzado', grade: 'Excelente', average: 5 },
						{ subject: 'Estadística', grade: 'Aprobado', average: 4.1 }
					]
				},
				{
					year: '4',
					schoolYear: '2025-2026',
					subjects: [
						{ subject: 'Geometría Diferencial', grade: 'Aprobado', average: 3.5 },
						{ subject: 'Optimización', grade: 'Excelente', average: 4.7 }
					]
				}
			]
		},
		{
			student_name: 'María',
			lastname: 'García',
			years: [
				{
					year: '1',
					schoolYear: '2022-2023',
					subjects: [
						{ subject: 'Matemática', grade: 'Excelente', average: 5 },
						{ subject: 'Matemática Discreta', grade: 'Aprobado', average: 3.5 }
					]
				},
				{
					year: '2',
					schoolYear: '2023-2024',
					subjects: [
						{ subject: 'Física', grade: 'Aprobado', average: 3.7 },
						{ subject: 'Álgebra Lineal', grade: 'Bien', average: 4.2 }
					]
				},
				{
					year: '3',
					schoolYear: '2024-2025',
					subjects: [
						{ subject: 'Estadística Avanzada', grade: 'Aprobado', average: 4.3 },
						{ subject: 'Análisis Complejo', grade: 'Excelente', average: 4.8 }
					]
				},
				{
					year: '4',
					schoolYear: '2025-2026',
					subjects: [
						{ subject: 'Teoría de la Probabilidad', grade: 'Bien', average: 4.2 },
						{ subject: 'Investigación Operativa', grade: 'Excelente', average: 4.9 }
					]
				}
			]
		}
	];
</script>

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
		Certificaciones de Notas de Estudiantes
	</h1>

	{#if students}
		{#each students as student}
			<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
				{student.student_name}
				{student.lastname}
			</h2>
			{#if student.years}
				{#each student.years as year}
					<h3 class="font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg">
						Año {year.year} Curso {year.schoolYear}
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
				{/each}
			{/if}
		{/each}
	{/if}
</section>
