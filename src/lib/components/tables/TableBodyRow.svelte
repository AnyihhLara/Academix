<script>
    import {TableBodyRow, TableBodyCell} from 'flowbite-svelte';

    export let values;
    export let updatableTable;
</script>

<TableBodyRow>
    {#each values as value}
        <TableBodyCell>{value}</TableBodyCell>
    {/each}
    {#if updatableTable}
        <TableBodyCell>
            <slot name="edit-a"/>
        </TableBodyCell>
        <TableBodyCell>
            <slot name="delete-a"/>
        </TableBodyCell>
    {/if}
</TableBodyRow>
