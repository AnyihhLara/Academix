<script>
	import Table from '$lib/components/shared/Table.svelte';

	let tableName = 'Reporte 3';

	let dataBySchoolYear = [
		{
			schoolYear: '2022-2023',
			years: [
				{
					year: 1,
					subjects: [
						{
							subject: 'Matemática 1',
							studentsGroups: [
								{
									studentsGroup: 1,
									evaluations: [
										{
											order_number: 1,
											student_name: 'Juan',
											lastname: 'Perez',
											evaluation: 'Desaprobado'
										},
										{
											order_number: 2,
											student_name: 'Ana',
											lastname: 'Lopez',
											evaluation: 'Desaprobado'
										}
									]
								},
								{
									studentsGroup: 2,
									evaluations: [
										{
											order_number: 1,
											student_name: 'Penélope',
											lastname: 'Lopez',
											evaluation: 'Desaprobado'
										},
										{
											order_number: 2,
											student_name: 'Francisco',
											lastname: 'Perez',
											evaluation: 'Aprobado'
										}
									]
								}
							]
						},
						{
							subject: 'IP',
							studentsGroups: [
								{
									studentsGroup: 1,
									evaluations: [
										{
											order_number: 1,
											student_name: 'Juan',
											lastname: 'Perez',
											evaluation: 'Aprobado'
										},
										{
											order_number: 2,
											student_name: 'Ana',
											lastname: 'Lopez',
											evaluation: 'Excelente'
										}
									]
								},
								{
									studentsGroup: 2,
									evaluations: [
										{
											order_number: 1,
											student_name: 'Penélope',
											lastname: 'Lopez',
											evaluation: 'Aprobado'
										},
										{
											order_number: 2,
											student_name: 'Francisco',
											lastname: 'Perez',
											evaluation: 'Bien'
										}
									]
								}
							]
						}
					]
				},
				{
					year: 2,
					subjects: []
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
		Listado de Evaluaciones por grupo en cada asignatura
	</h1>
	{#if dataBySchoolYear}
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
