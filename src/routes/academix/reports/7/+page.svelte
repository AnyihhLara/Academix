<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { Input, Label } from 'flowbite-svelte';
	let tableName = 'Reporte 7';
	let startDate,
		endDate,
		validDate = true; //temp
	let failedStudentsByGroup = [
		{
			schoolYear: '2022-2023',
			years: [
				{
					year: 1,
					studentsGroups: [
						{
							studentsGroup: 1,
							failedStudents: [
								{
									order_number: 1,
									student_name: 'Juan',
									lastname: 'Pérez',
									failed_subjects: ['Química', ' Historia']
								},
								{
									order_number: 2,
									student_name: 'María',
									lastname: 'García',
									failed_subjects: ['Ciencias', ' Literatura']
								}
							]
						}
					]
				}
			]
		}
	];

	function refreshItems() {}
</script>

<section>
	<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
		Listado de Evaluaciones por grupo en cada asignatura
	</h1>
	<div class="mx-5 space-y-5">
		<Label for="start-date">
			Fecha Inicial
			<Input id="start-date" type="date" bind:value={startDate} />
		</Label>
		<Label for="end-date">
			Fecha Final
			<Input id="end-date" type="date" bind:value={endDate} />
		</Label>
	</div>
	{#if validDate && startDate && endDate && failedStudentsByGroup}
		{#each failedStudentsByGroup as schoolYearData}
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
								{#each yearData.studentsGroups as studentsGroupData}
									<section
										class="mt-4"
										key={`${schoolYearData.schoolYear}-${yearData.year}-${studentsGroupData.studentsGroup}`}
									>
										<h4
											class="font-bold block mb-2 ml-6 text-secondary-800 dark:text-secondary-100 text-md"
										>
											Grupo: {studentsGroupData.studentsGroup}
										</h4>
										<Table
											{tableName}
											items={studentsGroupData.failedStudents}
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
