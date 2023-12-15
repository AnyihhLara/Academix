<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {onMount} from 'svelte';
    import subjectService from "$lib/services/SubjectService.js";
    import {page} from "$app/stores";

    onMount(() => {
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

{#if $page.data.role === 'Secretario'}
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
