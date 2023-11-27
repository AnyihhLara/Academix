<script>
    import {Table, TableBody, TableHead, TableHeadCell} from 'flowbite-svelte';
    import TableBodyRow from "$lib/components/tables/TableBodyRow.svelte";
    import TableWrapper from "$lib/components/tables/TableWrapper.svelte";
    import AddModalButton from "$lib/components/modals/add/AddModalButton.svelte";
    import TableAction from "$lib/components/tables/TableAction.svelte";

    export let showAddModal = false;
    export let showDeleteModal = false;
    export let showModifyModal = false;
    export let itemValuesToDelete = null;
    export let itemValuesToUpdate = null;
    export let tableHeader;
    export let updatableTable;
    export let columnNames;
    export let itemValues;

    function openAddModal() {
        showAddModal = true;
    }

    function openDeleteModal(values) {
        itemValuesToDelete = values;
        showDeleteModal = true;
    }

    function openModifyModal(values) {
        itemValuesToUpdate = values;
        showModifyModal = true;
    }
</script>

<TableWrapper showAddButton={true}>
    <span slot="h2-text">{tableHeader}</span>
    <AddModalButton slot="add-button" on:click={openAddModal}/>
    <Table hoverable={true} shadow={true}>
        <TableHead>
            {#each columnNames as column}
                <TableHeadCell>{column}</TableHeadCell>
            {/each}
            {#if updatableTable}
                <TableHeadCell/>
                <TableHeadCell/>
            {/if}
        </TableHead>
        <TableBody>
            {#each itemValues as values}
                <TableBodyRow {values} {updatableTable}>
                    <span slot="edit-a">
                        <TableAction color="teal-600" on:click={openModifyModal(values)}>Editar</TableAction>
                    </span>
                    <span slot="delete-a">
						<TableAction color="red-600" on:click={openDeleteModal(values)}>Eliminar</TableAction>
					    </span>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</TableWrapper>
