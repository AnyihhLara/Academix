<script>
	import { Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';

	let tableName = 'Reporte 5';
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
					students: [
						{
							rank: 1,
							order_number: 1,
							student_name: 'Juan',
							lastname: 'Perez',
							average: 4.8,
							sex: 'M',
							municipality: 'Ciudad X'
						}
					]
				}
			]
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
							students: [
								{
									rank: 1,
									order_number: 1,
									student_name: 'Juan',
									lastname: 'Perez',
									average: 4.8,
									sex: 'M',
									municipality: 'Ciudad X'
								}
							]
						},
						{
							studentsGroup: 2,
							students: []
						},
						{
							studentsGroup: 3,
							students: []
						}
					]
				}
			]
		}
	];

	function refreshItems() {}
</script>

<section class="px-2 pt-6 pb-8">
	<div class="flex items-center justify-between mx-6 gap-4">
		<h1 class="text-center text-2xl font-semibold text-primary-950 dark:text-primary-100">
			Escalafón
		</h1>
		<Select
			placeholder="Seleccione una opción:"
			items={options}
			bind:value={selectedOption}
			class="w-96 h-10 mt-1"
		/>
	</div>
	{#if selectedOption === 'Por año' && dataByYear}
		{#each dataByYear as schoolYearData}
			<section class="mt-4 mx-3" key={schoolYearData.schoolYear}>
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
								items={yearData.students}
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
			<section class="mt-4 mx-3" key={schoolYearData.schoolYear}>
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
											items={groupData.students}
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
