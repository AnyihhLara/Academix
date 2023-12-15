<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {onMount} from 'svelte';
    import studentService from "$lib/services/StudentService.js";
    import {page} from '$app/stores'

    onMount(() => {
        refreshItems();
    });

    let students = [],
        filters = [
            {name: 'Situaciones Académicas', key: 'academicSituation', options: [], selectedOptions: []},
            {name: 'Años', key: 'academicYear', options: [], selectedOptions: []},
            {name: 'Grupos', key: 'group', options: [], selectedOptions: []}
        ],
        isFilterable = true,
        isCreatable = false,
        isUpdatable = false,
        isDeletable = false;

    let tableName = "Estudiantes";
    let studentServ = studentService.getInstance();

    const refreshItems = () => {
        studentServ.getStudents().then((i) => {
            students = i;
        })
    }
</script>

{#if $page.data.role === 'Secretario'}
    <Table {tableName} items={students} {filters} {isFilterable} {isDeletable} {refreshItems}/>
{:else}
    <Table
            {tableName}
            items={students}
            {filters}
            {isFilterable}
            {isCreatable}
            {isUpdatable}
            {isDeletable}
            {refreshItems}
    />
{/if}
