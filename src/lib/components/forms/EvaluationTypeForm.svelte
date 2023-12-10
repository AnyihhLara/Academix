<script>
    import {Input, Label, NumberInput} from 'flowbite-svelte';
    import GenericForm from './GenericForm.svelte';
    import evaluationTypeService from "$lib/services/EvaluationTypeService.js";
    import {createEventDispatcher, onMount} from "svelte";

    export let action;
    export let item = null;
    let tableName = 'tipo de evaluación',
        defaultClass = 'mt-2',
        evaluationType = {name: '', numericalValue: 0};
    let evaluationTypeServ = evaluationTypeService.getInstance();
    const dispatch = createEventDispatcher();

    onMount(() => resetForm());

    async function createItem() {
        await evaluationTypeServ.createEvaluationType(
            evaluationType.name,
            evaluationType.numericalValue
        );
        dispatch('created');
    }

    async function updateItem() {
        await evaluationTypeServ.updateEvaluationType(
            item.evaluation_type_id,
            evaluationType.name,
            evaluationType.numericalValue
        );
        dispatch('updated');
    }

    async function deleteItem() {
        await evaluationTypeServ.deleteEvaluationType(item.evaluation_type_id);
        dispatch('deleted');
    }

    async function resetForm() {
        console.log('reset')
        if (item) {
            let {
                evaluation_type_id,
                evaluation_type_name,
                evaluation_numerical_value
            } = await evaluationTypeServ.getEvaluationType(item.evaluation_type_id);
            item.evaluation_type_id = evaluation_type_id;
            item.evaluation_type_name = evaluation_type_name;
            item.evaluation_numerical_value = evaluation_numerical_value;
            console.log(item)
            evaluationType.name = item.evaluation_type_name;
            evaluationType.numericalValue = item.evaluation_numerical_value;
        } else {
            evaluationType = {name: '', numericalValue: 0};
        }
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

{#if item}
    <h1>{item.evaluation_type_id}</h1>
{/if}
