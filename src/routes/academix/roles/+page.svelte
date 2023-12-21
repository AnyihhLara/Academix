<script>
    import Table from '$lib/components/shared/Table.svelte';
    import roleService from "$lib/services/RoleService.js";
    import {onMount} from "svelte";

    onMount(() => {
        refreshItems();
    });

    let roles = [];
    let tableName = "Roles";
    let roleServ = roleService.getInstance();

    const refreshItems = () => {
        roleServ.getRoles().then((i) => {
            roles = i;
        })
    }
</script>

<Table items={roles} {refreshItems} {tableName} isDeletable={false}/>
