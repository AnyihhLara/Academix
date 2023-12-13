<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {onMount} from 'svelte';
    import unenrollmentReasonService from "$lib/services/UnenrollmentReasonService.js";

    onMount(() => {
        refreshItems();
    });
    let unenrollmentReasons = [],
        filters = [],
        isFilterable;
    let tableName = "Causas de baja";
    let unenrollmentReasonServ = unenrollmentReasonService.getInstance();

    const refreshItems = () => {
        unenrollmentReasonServ.getUnenrollmentReasons().then((i) => {
            unenrollmentReasons = i;
        })
    }
</script>

<Table {tableName} items={unenrollmentReasons} {filters} {isFilterable} {refreshItems}/>
