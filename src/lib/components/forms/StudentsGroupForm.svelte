<script>
    import {Label, NumberInput, Select} from 'flowbite-svelte';
    import GenericForm from './GenericForm.svelte';
    import studentsGroupService from "$lib/services/StudentsGroupService.js";
    import {createEventDispatcher} from "svelte";

    export let action;
    export let item = null;
    let tableName = 'grupo de estudiantes',
        defaultClass = 'mt-2',
        studentsGroup = {year: 0, number: 0};
    let years;
    let studentsGroupServ = studentsGroupService.getInstance();
    const dispatch = createEventDispatcher();

    async function createItem() {
        await studentsGroupServ.createStudentsGroup(
            1,  //studentsGroup.year,
            studentsGroup.number
        );
        dispatch('created');
    }

    async function updateItem() {
        await studentsGroupServ.updateStudentsGroup(
            item.group_id,
            1,  //studentsGroup.year,
            studentsGroup.number
        );
        dispatch('updated');
    }

    async function deleteItem() {
        await studentsGroupServ.deleteStudentsGroup(
            item.year_id,
            item.group_id
        );
        dispatch('deleted');
    }

    function resetForm() {
        studentsGroup = {year: 0, number: 0};
    }

    //TODO: Put the ''required'' in the inputs that need it too
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
    <div>
        <Label
        >Año
            <Select class="mt-2" items={years} bind:value={studentsGroup.year}/>
        </Label>
    </div>
    <div>
        <Label for="number"
        >Número
            <NumberInput id="number" class={defaultClass} bind:value={studentsGroup.number} required/>
        </Label>
    </div>
</GenericForm>
