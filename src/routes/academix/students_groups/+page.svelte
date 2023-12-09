<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { view } from '$lib/stores/stores.js';
	import { onMount } from 'svelte';

	onMount(() => {
		let authServ = authService.getInstance();
		let routes = [];
		if (browser) {
			routes = authServ.getAuthorizedRoutes();
			if (!routes.includes($page.url.pathname)) {
				$view = routes[0];
				goto($view);
			}
		}
	});
	let studentsGroups = [],
		filters = [{ name: 'Años', key: 'academicYear', options: [], selectedOptions: [] }],
		isFilterable = true;
</script>

<Table tableName="Grupos de estudiantes" items={studentsGroups} {filters} {isFilterable} />
