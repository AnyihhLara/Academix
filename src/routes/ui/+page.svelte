<script>
    import ErrorModal from "$lib/components/modals/error/ErrorModal.svelte";
    import TablesDropdown from "$lib/components/TablesDropdown.svelte";
    import {selectedTable} from "$lib/stores/stores.js";

    let error = null;

    // function addActivity() {
    //     try {
    //         controller.addActivity(name, date, participants);
    //         controller.sportsActivities = controller.sportsActivities;
    //         showAddModal = false;
    //         name = '';
    //         date = null;
    //         participants = 0;
    //     } catch (e) {
    //         error = e.message;
    //     }
    // }
    //
    // function modifyActivity() {
    //     try {
    //         controller.modifyActivity(activityToModify.name, date, participants);
    //         controller.sportsActivities = controller.sportsActivities;
    //         showModifyModal = false;
    //         date = null;
    //         participants = 0;
    //     } catch (e) {
    //         error = e.message;
    //     }
    // }
    //
    // function deleteActivity() {
    //     try {
    //         controller.deleteActivity(activityToDelete.name);
    //         controller.sportsActivities = controller.sportsActivities;
    //     } catch (e) {
    //         error = e.message;
    //     }
    // }
    // function openDeleteModal(activity) {
    //     activityToDelete = activity;
    //     showDeleteModal = true;
    // }
    // function openModifyModal(activity) {
    //     activityToModify = activity;
    //     showModifyModal = true;
    // }
</script>

<div class="flex justify-center">
    <TablesDropdown/>
</div>

<svelte:component this={$selectedTable} {error}/>

<ErrorModal open={error} on:click={() => (error = null)} on:close={() => (error = null)}
>{error}
</ErrorModal>




<!--    <Table activities={controller.sportsActivities} {openDeleteModal} {openModifyModal} />-->
