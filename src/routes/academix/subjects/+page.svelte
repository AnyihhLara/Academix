<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { view, loggedUser } from '$lib/stores/stores.js';
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
	let subjects = [],
		filters = [{ name: 'Años', key: 'academicYear', options: [], selectedOptions: [] }],
		isFilterable = true,
		isCreatable = false,
		isUpdatable = false,
		isDeletable = false;
</script>

{#if $loggedUser.role_name === 'Secretario'}
	<Table tableName="Asignaturas" items={subjects} {filters} {isFilterable} />
{:else}
	<Table
		tableName="Asignaturas"
		items={subjects}
		{filters}
		{isFilterable}
		{isCreatable}
		{isUpdatable}
		{isDeletable}
	/>
{/if}
