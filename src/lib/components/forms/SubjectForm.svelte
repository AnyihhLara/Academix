<script>
    import {Input, Label, NumberInput, Select} from 'flowbite-svelte';
    import GenericForm from './GenericForm.svelte';
    import {createEventDispatcher} from "svelte";
    import subjectService from "$lib/services/SubjectService.js";

    export let action;
    export let item = null;
    let tableName = 'asignatura',
        defaultClass = 'mt-2',
        subject = {name: '', plannedHours: 0, year: 0};
    let years;
    let subjectServ = subjectService.getInstance();
    const dispatch = createEventDispatcher();

    async function createItem() {
        await subjectServ.createSubject(
            subject.name,
            subject.plannedHours,
            3  //subject.year
        );
        dispatch('created');
    }

    async function updateItem() {
        await subjectServ.updateSubject(
            item.subject_id,
            subject.name,
            subject.plannedHours,
            3  // subject.year
        );
        dispatch('updated');
    }

    async function deleteItem() {
        await subjectServ.deleteSubject(item.subject_id);
        dispatch('deleted');
    }

    function resetForm() {
        subject = {name: '', plannedHours: 0, year: 0};
    }

    //TODO: Put the ''required'' in the inputs that need it too
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
    <div>
        <Label for="name"
        >Nombre
            <Input
                    type="text"
                    id="name"
                    placeholder="Nombre de la asignatura"
                    class={defaultClass}
                    bind:value={subject.name}
                    required
            />
        </Label>
    </div>
    <div>
        <Label for="plannedHours"
        >Horas planificadas
            <NumberInput
                    id="plannedHours"
                    class={defaultClass}
                    bind:value={subject.plannedHours}
                    required
            />
        </Label>
    </div>

    <div>
        <Label
        >Año
            <Select class="mt-2" items={years} bind:value={subject.year}/>
        </Label>
    </div>
</GenericForm>
