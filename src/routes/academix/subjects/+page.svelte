<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {browser} from '$app/environment';
    import {page} from '$app/stores';
    import {goto} from '$app/navigation';
    import authService from '$lib/services/AuthService.js';
    import {view, loggedUser} from '$lib/stores/stores.js';
    import {onMount} from 'svelte';
    import subjectService from "$lib/services/SubjectService.js";

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
    let subjects = [],
        filters = [{name: 'Años', key: 'academicYear', options: [], selectedOptions: []}],
        isFilterable = true,
        isCreatable = false,
        isUpdatable = false,
        isDeletable = false;
    let tableName = "Asignaturas";
    let subjectServ = subjectService.getInstance();

    const refreshItems = () => {
        subjectServ.getSubjects().then((i) => {
            subjects = i;
        })
    }
</script>

{#if $loggedUser.role_name === 'Secretario'}
    <Table {tableName} items={subjects} {filters} {isFilterable} {refreshItems}/>
{:else}
    <Table
            {tableName}
            items={subjects}
            {filters}
            {isFilterable}
            {isCreatable}
            {isUpdatable}
            {isDeletable}
            {refreshItems}
    />
{/if}
