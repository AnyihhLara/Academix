<script>
	import { Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';

	let tableName = 'Reporte 8 por año';
	let selectedOption = 'Por año';
	let options = [
		{ value: 'Por año', name: 'Por año' },
		{ value: 'Por grupo', name: 'Por grupo' }
	];
	let dataByYear = [
		{
			schoolYear: '2022-2023',
			years: [
				{
					year: 1,
					unenrollment_students: [
						{
							order_number: 1,
							student_name: 'Juan',
							lastname: ' Pérez',
							students_group: 1,
							unenrollment_reason: 'Culminación de estudios'
						},
						{
							order_number: 2,
							student_name: 'María',
							lastname: 'García',
							students_group: 1,
							unenrollment_reason: 'Enfermedad'
						}
					]
				},
				{
					year: 2,
					unenrollment_students: []
				}
			]
		},
		{
			schoolYear: '2023-2024',
			years: []
		}
	];
	let dataByGroup = [
		{
			schoolYear: '2022-2023',
			years: [
				{
					year: 1,
					studentsGroups: [
						{
							studentsGroup: 1,
							unenrollment_students: [
								{
									order_number: 1,
									student_name: 'Juan',
									lastname: ' Pérez',
									unenrollment_reason: 'Culminación de estudios'
								},
								{
									order_number: 2,
									student_name: 'María',
									lastname: 'García',
									unenrollment_reason: 'Enfermedad'
								}
							]
						},
						{
							studentsGroup: 2,
							unenrollment_students: []
						}
					]
				},
				{
					year: 2,
					studentsGroups: []
				}
			]
		},
		{
			schoolYear: '2023-2024',
			years: []
		}
	];

	function setTableName() {
		if (selectedOption === 'Por año') {
			tableName = 'Reporte 8 por año';
		} else if (selectedOption === 'Por grupo') {
			tableName = 'Reporte 8 por grupo';
		}
	}

	function refreshItems() {}
</script>

<section>
	<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
		Listado de los estudiantes que causan baja en un curso
	</h1>
	<div class="flex justify-center mx-5">
		<Select
			placeholder="Seleccione una opción:"
			items={options}
			bind:value={selectedOption}
			on:change={setTableName}
		/>
	</div>
	{#if selectedOption === 'Por año' && dataByYear}
		{#each dataByYear as schoolYearData}
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
							<Table
								{tableName}
								items={yearData.unenrollment_students}
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
	{:else if selectedOption === 'Por grupo' && dataByGroup}
		{#each dataByGroup as schoolYearData}
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
								{#each yearData.studentsGroups as groupData}
									<section
										class="mt-4"
										key={`${schoolYearData.schoolYear}-Grupo-${yearData.year}-Grupo-${groupData.studentsGroup}`}
									>
										<h2
											class="font-bold block mb-2 ml-3 text-secondary-850 dark:text-secondary-100 text-lg"
										>
											Grupo: {groupData.studentsGroup}
										</h2>
										<Table
											{tableName}
											items={groupData.unenrollment_students}
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
