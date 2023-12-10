<script>
    import {Input, Label, NumberInput} from 'flowbite-svelte';
    import GenericForm from './GenericForm.svelte';
    import evaluationTypeService from "$lib/services/EvaluationTypeService.js";
    import {createEventDispatcher} from "svelte";

    export let action;
    export let item = null;
    let tableName = 'tipo de evaluación',
        defaultClass = 'mt-2',
        evaluationType = {name: '', numericalValue: 0};
    let evaluationTypeServ = evaluationTypeService.getInstance();
    const dispatch = createEventDispatcher();

    async function createItem() {
        await evaluationTypeServ.createEvaluationType(evaluationType.name, evaluationType.numericalValue);
        dispatch('created');
    }

    async function updateItem() {
        await evaluationTypeServ.updateEvaluationType(item.evaluation_type_id, evaluationType.name, evaluationType.numericalValue);
        dispatch('updated');
    }

    async function deleteItem() {
        await evaluationTypeServ.deleteEvaluationType(item.evaluation_type_id);
        dispatch('deleted');
    }

    function resetForm() {
        evaluationType = {name: '', numericalValue: 0};
    }
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
    <div>
        <Label for="name"
        >Nombre
            <Input
                    type="text"
                    id="name"
                    placeholder="Nombre del tipo de evaluación"
                    class={defaultClass}
                    bind:value={evaluationType.name}
                    required
            />
        </Label>
    </div>
    <div>
        <Label for="numericalValue"
        >Valor numérico
            <NumberInput
                    id="numericalValue"
                    class={defaultClass}
                    bind:value={evaluationType.numericalValue}
                    required
            />
        </Label>
    </div>
</GenericForm>
