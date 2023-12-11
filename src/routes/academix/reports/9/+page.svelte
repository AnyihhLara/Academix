<script>
	import Table from '$lib/components/shared/Table.svelte';

	let tableName = 'Reporte 9';
	let dataByYear = [
		{
			schoolYear: '2022-2023',
			years: [
				{
					year: 1,
					repeat_students: [
						{
							order_number: 1,
							student_name: 'Juan',
							lastname: ' Pérez',
							students_group: 1
						},
						{
							order_number: 2,
							student_name: 'María',
							lastname: 'García',
							students_group: 1
						}
					]
				},
				{
					year: 2,
					repeat_students: []
				}
			]
		},
		{
			schoolYear: '2023-2024',
			years: []
		}
	];

	function refreshItems() {}
</script>

<section>
	<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
		Listado de los estudiantes repitentes por año
	</h1>
	{#if dataByYear}
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
