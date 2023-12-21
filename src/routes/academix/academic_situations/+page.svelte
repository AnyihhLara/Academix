<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {onMount} from 'svelte';
    import academicSituationService from "$lib/services/AcademicSituationService.js";

    onMount(() => {
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

<Table items={academicSituations} {refreshItems} {tableName} isDeletable={false}/>
