<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {onMount} from 'svelte';
    import studentsGroupService from "$lib/services/StudentsGroupService.js";

    onMount(() => {
        refreshItems();
    });
    let studentsGroups = [],
        filters = [{name: 'Años', key: 'academicYear', options: [], selectedOptions: []}],
        isFilterable = true;
    let tableName = "Grupos de estudiantes";
    let studentsGroupServ = studentsGroupService.getInstance();

    const refreshItems = () => {
        studentsGroupServ.getStudentsGroups().then((i) => {
            studentsGroups = i;
        })
    }
</script>

<Table {filters} {isFilterable} items={studentsGroups} {refreshItems} {tableName}/>
