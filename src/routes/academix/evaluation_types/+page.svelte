<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
    import evaluationTypeService from "$lib/services/EvaluationTypeService.js";
    import {tables, view} from '$lib/stores/stores.js';
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
        let tableColumns = $tables.find((table) => table.name === tableName).tableColumns
        evaluationTypeServ.getEvaluationTypes().then((i) => {
            i.forEach((evaluation) => {
                let myObject = {}
                tableColumns.forEach((column) => {
                    myObject[column.key] = evaluation[column.key]
                })
                evaluationTypes.push(myObject)
                evaluationTypes = evaluationTypes
            })
        })
    }

</script>

<Table {tableName} items={evaluationTypes} {filters} {isFilterable} />
