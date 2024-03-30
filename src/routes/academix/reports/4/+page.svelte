<script>
	import { Button, Select } from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import reportService from '$lib/services/ReportService.js';
	import { onMount } from 'svelte';
	import { pdfHeaders, t } from '$lib/stores/stores.js';
	import { generatePDF } from '$lib';
	import dayjs from 'dayjs';

	onMount(() => {
		refreshItems();
	});

	const tableName = 'Reporte 4';
	const reportName = 'Listado de los promedios finales obtenidos por los estudiantes de cada grupo';
	$: options = [
		{ value: 'Acumulado', name: $t('Acumulado') },
		{ value: 'Anual', name: $t('Anual') }
	];
	let selectedOption = 'Acumulado';
	let service = reportService.getInstance();
	let dataByGroup = [];

	async function downloadReport4() {
		const headers = Object.fromEntries(
			Object.entries($pdfHeaders.find(({ reportName }) => reportName === tableName).headers).map(
				([key, value]) => [key, $t(value)]
			)
		);
		const reportData = dataByGroup.flatMap((dataItem) =>
			dataItem.groups.map((groupData) => {
				const students = groupData.students.map((studentData) => ({
					...studentData,
					year: dataItem.year,
					groupNumber: groupData.groupNumber
				}));

				return students.map((student) =>
					Object.fromEntries(
						Object.entries(student).map(([key, value]) => [headers[key] || key, value])
					)
				);
			})
		);

		generatePDF(
			reportData,
			$t(`Reporte #4 ${selectedOption}: \n${reportName}`) + `\n${dayjs().format('YYYY-MMM-DD')}`,
			false,
			true
		);
	}

	const refreshItems = () => {
		service.report4(selectedOption).then((i) => {
			dataByGroup = i;
		});
	};
</script>

<section class="px-2 pt-6 pb-8">
	<div class="flex items-center justify-between mx-6 gap-4">
		<h1 class="text-center text-2xl font-semibold text-primary-950 dark:text-primary-100">
			{$t(reportName)}
		</h1>
		<div class="flex justify-center mx-5">
			<Select
				bind:value={selectedOption}
				class="w-96 h-10 mt-1"
				items={options}
				on:change={refreshItems}
				placeholder={$t('Seleccione una opción:')}
			/>
		</div>
	</div>
	{#if dataByGroup.length > 0}
		<div class="flex justify-end pr-11 pt-4">
			<Button on:click={downloadReport4} size="sm">{$t('Descargar PDF')}</Button>
		</div>
		{#each dataByGroup as periodData}
			<section class="mt-6 mx-3" key={selectedOption}>
				<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
					{$t(selectedOption)} - {$t('Año')}: {periodData.year}
				</h2>
				{#if selectedOption === 'Acumulado'}
					<h3 class="font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg">
						{$t('Período')}: 1
						{#if periodData.year > 1}
							- {periodData.year}
						{/if}
						año
					</h3>
				{/if}
				{#each periodData.groups as groupData}
					<div class="group">
						<h4
							class="font-bold block mb-2 ml-6 text-secondary-800 dark:text-secondary-100 text-lg"
						>
							{$t('Grupo')}
							{groupData.groupNumber}
						</h4>
						<Table
							{tableName}
							items={groupData.students}
							isCreatable={false}
							isUpdatable={false}
							isDeletable={false}
							isNamed={false}
							{refreshItems}
						/>
					</div>
				{/each}
			</section>
		{/each}
	{/if}
</section>
