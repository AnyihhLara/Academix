<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { view } from '$lib/stores/stores.js';
	import { onMount } from 'svelte';
    import academicSituationService from "$lib/services/AcademicSituationService.js";

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
        refreshItems();
	});

	let academicSituations = [];
    let tableName = "Situaciones académicas";
    let academicSituationServ = academicSituationService.getInstance();

    const refreshItems = () => {
        academicSituationServ.getAcademicSituations().then((i) => {
            academicSituations = i;
        })
    }
</script>

<Table {tableName} items={academicSituations} {refreshItems}/>
