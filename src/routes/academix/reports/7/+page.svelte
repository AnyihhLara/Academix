<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { Button, Input, Label, Modal, Select } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import reportService from '$lib/services/ReportService.js';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import yearService from '$lib/services/YearService.js';
	import { currentSchoolYear } from '$lib/stores/stores.js';

	onMount(async () => {
		let yearServ = yearService.getInstance();
		let studentsGroupServ = studentsGroupService.getInstance();
		years = await yearServ.getYears();
		years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
		years = years.map(({ year }) => ({ value: year, name: year }));
		groups = await studentsGroupServ.getStudentsGroups();
		refreshItems();
	});

	let tableName = 'Reporte 7';
	let service = reportService.getInstance();
	let startDate,
		endDate,
		validDate = true, //temp
		selectedYear,
		selectedGroup,
		error = null;
	let years, groups, selectableGroups, failedStudentsByGroup;
	$: if (startDate && endDate && selectedYear) {
		const startDateDate = new Date(startDate);
		const endDateDate = new Date(endDate);

		if (startDateDate >= endDateDate) {
			validDate = false;
			error = 'La fecha inicial no puede ser mayor ni igual que la fecha final.';
			(startDate = ''), (endDate = '');
		} else {
			validDate = true;
		}
	}

	$: if (selectedYear || selectedGroup) {
		selectableGroups = groups.filter(({ year }) => year === selectedYear);
		selectableGroups = selectableGroups.map(({ group_number }) => ({
			value: group_number,
			name: group_number
		}));
		selectableGroups = selectableGroups.filter(
			(group, index, self) =>
				index === self.findIndex((t) => t.value === group.value && t.name === group.name)
		);
		refreshItems();
	}
	$: if (startDate || endDate || selectedYear || selectedGroup) {
		refreshItems();
	}
	const refreshItems = () => {
		if (validDate && startDate && endDate && selectedYear && selectedGroup) {
			service.report7(startDate, endDate, selectedYear, selectedGroup).then((i) => {
				failedStudentsByGroup = i;
			});
			console.log(failedStudentsByGroup);
		}
	};
</script>

<section>
	<h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
		Listado de estudiantes desaprobados por grupo en un rango de fecha
	</h1>
	<div class="flex items-center mx-5 gap-5">
		<Label for="start-date">
			Fecha Inicial
			<Input id="start-date" type="date" bind:value={startDate} />
		</Label>
		<Label for="end-date">
			Fecha Final
			<Input id="end-date" type="date" bind:value={endDate} />
		</Label>
		{#if years}
			<Label
				>Año <Select
					placeholder="Seleccione un año:"
					items={years}
					bind:value={selectedYear}
					on:change={() => {
						selectedGroup = '';
					}}
				/></Label
			>
			{#if selectableGroups}
				<div class="flex justify-center items-center gap-3">
					<Label
						>Grupo <Select
							placeholder="Seleccione un grupo:"
							items={selectableGroups}
							bind:value={selectedGroup}
						/></Label
					>
				</div>
			{/if}
		{/if}
	</div>
	{#if validDate && startDate && endDate && selectedYear && selectedGroup && failedStudentsByGroup}
		<section class="mt-6 mx-3 pb-2">
			{#if failedStudentsByGroup.school_years}
				{#each failedStudentsByGroup.school_years as data}
					<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
						Curso: {data.school_year} Año: {data.year} Grupo: {data.group_number}
					</h2>
					<Table
						{tableName}
						items={data.failed_students}
						isCreatable={false}
						isUpdatable={false}
						isDeletable={false}
						isNamed={false}
						{refreshItems}
					/>
				{/each}
			{/if}
		</section>
	{/if}
</section>

<Modal
	title="Error"
	bind:open={error}
	color="red"
	size="xs"
	autoclose
	on:close={() => (error = null)}
>
	<div class="text-base leading-relaxed">
		{error}
	</div>
	<svelte:fragment slot="footer">
		<Button on:click={() => (error = null)} color="red">OK</Button>
	</svelte:fragment>
</Modal>
