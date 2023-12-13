<script>
    import Table from '$lib/components/shared/Table.svelte';
    import userService from "$lib/services/UserService.js";
    import {onMount} from "svelte";

    onMount(() => {
        refreshItems();
    });

    let users = [],
        filters = [
            {
                name: 'Rol',
                key: 'role',
                options: ['Administrador', 'Estudiante', 'Profesor', 'Secretario'],
                selectedOptions: []
            }
        ],
        isFilterable = true;
    let tableName = "Usuarios";
    let userServ = userService.getInstance();

    const refreshItems = () => {
        userServ.getUsers().then((i) => {
            users = i;
        })
    }
</script>

<Table {filters} {isFilterable} items={users} {refreshItems} {tableName}/>
