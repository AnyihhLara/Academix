<script>
    import {Button, Dropdown, DropdownItem} from 'flowbite-svelte';
    import {ChevronDownSolid} from 'flowbite-svelte-icons';
    import {selectedTable} from '$lib/stores/stores.js';
    import {tableNames} from "$lib/stores/stores.js";

    function selectTable(component) {
        selectedTable.set(component);
    }
</script>

<Button>Mostrar tabla
    <ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white"/>
</Button>
<Dropdown>
    {#each $tableNames as {name, component}}
        <DropdownItem on:click={() => selectTable(component)}>{name}</DropdownItem>
    {/each}
</Dropdown>
