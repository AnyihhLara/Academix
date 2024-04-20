<script>
	import {
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { tables, t } from '$lib/stores/stores.js';
	import Filter from './Filter.svelte';

	export let tableName = '',
		items = [],
		filters = [],
		isFilterable = false,
		isCreatable = true,
		isUpdatable = true,
		isDeletable = true,
		isNamed = true,
		refreshItems;

	let tableInfo = $tables.find((table) => table.name === tableName),
		component = null,
		tableColumns = null,
		tableHeader = '';
	$: filteredItems = items;
	if (tableInfo) {
		component = tableInfo.component;
		tableColumns = tableInfo.tableColumns;
	}
	$: if (tableName !== tableInfo.name) {
		tableInfo = $tables.find((table) => table.name === tableName);
		component = tableInfo.component;
		tableColumns = tableInfo.tableColumns;
	}
	$: if (tableName) {
		tableHeader = $t(tableName);
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

<section class="mt-4 mx-3 pb-5">
	<div class="flex xs:justify-start xs:gap-4 2xl:gap-0 2xl:justify-between items-center">
		{#if isNamed}
			<h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
				{tableHeader}
			</h2>
		{/if}
		{#if (component && isCreatable) || isFilterable}
			<div class="flex gap-4 mb-2 mr-3">
				{#if component && isCreatable}
					<svelte:component this={component} action="Create" on:created={refreshItems} />
				{/if}

				{#if isFilterable}
					<Filter {filters} on:change={applyFilters} />
				{/if}
			</div>
		{/if}
	</div>
	<Table hoverable={true} shadow={true}>
		<TableHead>
			{#if tableColumns}
				{#each tableColumns as column}
					<TableHeadCell padding={defaultClass} scope="col">{$t(column.label)}</TableHeadCell>
				{/each}
				{#if isUpdatable}
					<TableHeadCell padding={defaultClass} scope="col" />
				{/if}
				{#if isDeletable}
					<TableHeadCell padding={defaultClass} scope="col" />
				{/if}
			{/if}
		</TableHead>
		<TableBody>
			{#if filteredItems}
				{#each filteredItems as item (item)}
					<TableBodyRow>
						{#if tableColumns}
							{#each tableColumns as column}
								<TableBodyCell tdClass={defaultClass}>{item[column.key]}</TableBodyCell>
							{/each}
						{/if}
						{#if component}
							{#if isUpdatable}
								<TableBodyCell tdClass={defaultClass}>
									<svelte:component
										this={component}
										action="Update"
										on:updated={refreshItems}
										{item}
									/>
								</TableBodyCell>
							{/if}
							{#if isDeletable}
								<TableBodyCell tdClass={defaultClass}>
									<svelte:component
										this={component}
										action="Delete"
										on:deleted={refreshItems}
										{item}
									/>
								</TableBodyCell>
							{/if}
						{/if}
					</TableBodyRow>
				{/each}
			{/if}
		</TableBody>
	</Table>
</section>
