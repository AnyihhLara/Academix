<script>
    import {onMount} from "svelte";
    import CarService from "$lib/services/CarService.js";
    import Table from "$lib/components/tables/Table.svelte";
    import CreateCar from "$lib/components/modals/car/CreateCar.svelte";

    const carService = CarService.getInstance();
    let items;
    let itemValues = [];
    const tableHeader = 'Listado de carros';
    const columnNames = ['Num flotilla', 'Placa', 'Marca'];
    let showAddModal = false;
    let showDeleteModal = false;
    let showModifyModal = false;
    let itemValuesToDelete = null;
    let itemValuesToUpdate = null;
    let car_fleet = '';
    let licence_plate = '';
    let brand_name = '';
    export let error;

    onMount(async () => {
        items = await carService.getCars();
        itemValues = items.map(item => [item.car_fleet, item.licence_plate, item.brand_name]);
    });

    function findItem(values) {
        let valueToFind = values[0];
        return items.find(item => values.includes(item.car_fleet));
    }

    // TODO: Make the modals work :-(
    // async function createItem(item) {
    //     // TODO: implement
    // }
    //
    // function updateItem(item) {
    //     // TODO: implement
    // }
    //
    // function deleteItem(item) {
    //     // TODO: implement
    // }
    //
    // function handleAdding() {
    //     try {
    //         console.log('adding')
    //         let item = findItem(values);
    //         console.log(values)
    //         console.log(item)
    //         createItem(item);
    //         showAddModal = false;
    //     } catch (e) {
    //         error = e.message;
    //     }
    // }
    //
    // function handleModifing() {
    //     try {
    //         let item = findItem(values);
    //         updateItem(itemValuesToUpdate);
    //         showModifyModal = false;
    //     } catch (e) {
    //         error = e.message;
    //     }
    // }
    //
    // function handleDeleting() {
    //     try {
    //         deleteItem(itemValuesToDelete);
    //     } catch (e) {
    //         error = e.message;
    //     }
    // }
</script>

<Table updatableTable={true}
       {tableHeader}
       {columnNames}
       {itemValues}
       bind:showAddModal
       {showModifyModal}
       {showDeleteModal}
       {itemValuesToUpdate}
       {itemValuesToDelete}
/>
