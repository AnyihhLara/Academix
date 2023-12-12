<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { Label, Select } from 'flowbite-svelte';

	let tableName = 'Reporte 6';
	let selectedOption = '123456789',
		options = [{ value: '123456789', name: '123456789' }];
	function refreshItems() {}
	let student = {
		student_code: '123456789',
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
				placeholder="Seleccione un estudiante:"
				items={options}
				bind:value={selectedOption}
				class="w-96 h-10 mt-1"
			/>
		</div>
	</div>
	<section class="mt-4 mx-3" key={student.student_code}>
		<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
			{student.student_name}
			{student.lastname}
		</h2>
		{#if student.years}
			{#each student.years as year}
				<section class="mt-4" key={`${student.student_code}-${year.year}`}>
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
				</section>
			{/each}
		{/if}
	</section>
</section>
