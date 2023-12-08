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
	export let tableName, items;

	let tableInfo = $tables.find((table) => table.name === tableName),
		component = null,
		tableColumns = null;
	if (tableInfo) {
		component = tableInfo.component;
		tableColumns = tableInfo.tableColumns;
	}
	let defaultClass = 'px-4 py-3';
</script>

<section class="mt-6 mx-3">
	<h2 class="m-3 font-bold block text-secondary-950 dark:text-secondary-100 text-xl">
		{tableName}
	</h2>
	<Table hoverable={true} shadow={true}>
		<TableHead>
			{#if tableColumns}
				{#each tableColumns as column}
					<TableHeadCell padding={defaultClass} scope="col">{column.label}</TableHeadCell>
				{/each}
				<TableHeadCell padding={defaultClass} scope="col"></TableHeadCell>
			{/if}
		</TableHead>
		<TableBody>
			{#if items}
				{#each items as item}
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
