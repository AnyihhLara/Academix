<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { tables } from '$lib/stores/stores.js';
	import Filter from './Filter.svelte';
	export let tableName, items, filters, isFilterable;

	let tableInfo = $tables.find((table) => table.name === tableName),
		component = null,
		tableColumns = null,
		filteredItems = items;
	if (tableInfo) {
		component = tableInfo.component;
		tableColumns = tableInfo.tableColumns;
	}
	let defaultClass = 'px-4 py-3';
	function applyFilters() {
		filteredItems = items;
		filters.forEach((filter) => {
			if (filter.selectedOptions && filter.selectedOptions.length > 0) {
				filteredItems = filteredItems.filter((item) =>
					filter.selectedOptions.includes(item[filter.key])
				);
			}
		});
	}
</script>

<section class="mt-6 mx-3">
	<div class="flex justify-between items-center">
		<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
			{tableName}
		</h2>
		{#if isFilterable}
			<div class="mb-3 mr-3"><Filter {filters} on:change={applyFilters} /></div>
		{/if}
	</div>
	<Table hoverable={true} shadow={true}>
		<TableHead>
			{#if tableColumns}
				{#each tableColumns as column}
					<TableHeadCell padding={defaultClass} scope="col">{column.label}</TableHeadCell>
				{/each}
				<TableHeadCell padding={defaultClass} scope="col"></TableHeadCell>
				<TableHeadCell padding={defaultClass} scope="col"></TableHeadCell>
			{/if}
		</TableHead>
		<TableBody>
			{#if filteredItems}
				{#each filteredItems as item}
					<TableBodyRow>
						{#if tableColumns}
							{#each tableColumns as column}
								<TableBodyCell tdClass={defaultClass}>{item[column.key]}</TableBodyCell>
							{/each}
						{/if}
						{#if component}
							<TableBodyCell tdClass={defaultClass}
								><svelte:component this={component} action="Update" /></TableBodyCell
							>
							<TableBodyCell tdClass={defaultClass}
								><svelte:component this={component} action="Delete" /></TableBodyCell
							>
						{/if}
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
	</Table>
	<div class="mt-4">
		{#if component}
			<svelte:component this={component} action="Create" />
		{/if}
	</div>
</section>
