<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
    import evaluationTypeService from "$lib/services/EvaluationTypeService.js";
    import {view} from '$lib/stores/stores.js';
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
        refreshItems();
	});

	let evaluationTypes = [],
		filters = [],
		isFilterable = false;
    let tableName = "Tipos de evaluaciones";
    let evaluationTypeServ = evaluationTypeService.getInstance();

    const refreshItems = () => {
        evaluationTypeServ.getEvaluationTypes().then((i) => {
            evaluationTypes = i;
        })
    }

</script>

<Table {tableName} items={evaluationTypes} {filters} {isFilterable} {refreshItems}/>
