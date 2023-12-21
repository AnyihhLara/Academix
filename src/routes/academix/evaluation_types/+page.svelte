<script>
	import Table from '$lib/components/shared/Table.svelte';
	import evaluationTypeService from '$lib/services/EvaluationTypeService.js';
	import { onMount } from 'svelte';

	onMount(() => {
		refreshItems();
	});

	let evaluationTypes = [],
		filters = [],
		isFilterable = false;
	let tableName = 'Tipos de evaluaciones';
	let evaluationTypeServ = evaluationTypeService.getInstance();

	const refreshItems = () => {
		evaluationTypeServ.getEvaluationTypes().then((i) => {
			evaluationTypes = i;
		});
	};
</script>

<Table
	{filters}
	{isFilterable}
	items={evaluationTypes}
	{refreshItems}
	{tableName}
	isDeletable={false}
/>
