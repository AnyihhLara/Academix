<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { onMount } from 'svelte';
	import yearService from '$lib/services/YearService.js';

	onMount(() => {
		refreshItems();
	});

	let years = [];
	let tableName = 'Años';
	let yearServ = yearService.getInstance();

	const refreshItems = () => {
		yearServ.getYears().then((i) => {
			years = i;
		});
	};
</script>

<Table items={years} {refreshItems} {tableName} isDeletable={false} />
