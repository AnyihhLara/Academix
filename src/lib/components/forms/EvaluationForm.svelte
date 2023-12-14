<script>
	import {Input, Label, Select} from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
    import evaluationService from "$lib/services/EvaluationService.js";
	import {createEventDispatcher} from "svelte";

	export let action;
	export let item = null;

    let tableName = 'evaluación',
        defaultClass = 'mt-2',
        evaluation = {evaluationType: '', student: '', subject: '', evaluationDate: ''};
    let evaluationTypes, students, subjects;
    let evaluationServ = evaluationService.getInstance();
	const dispatch = createEventDispatcher();

    async function createItem() {
        console.log('create')
		await evaluationServ.createEvaluation(
			1,          //evaluation type
			1,          //student
			1,          //subject
			evaluation.evaluationDate
		);
		dispatch('created');
    }

    async function updateItem() {
		await evaluationServ.updateEvaluation(
			item.evaluation_id,
			1,          //evaluation type
			1,          //student
			1,          //subject
			evaluation.evaluationDate
		);
		dispatch('updated');
	}

    async function deleteItem() {
		await evaluationServ.deleteEvaluation(item.evaluation_id);
		dispatch('deleted');
	}

    function resetForm() {
        evaluation = {evaluationType: '', student: '', subject: '', evaluationDate: ''};
    }
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
    <div>
        <Label
        >Tipo de Evaluación
            <Select
                    bind:value={evaluation.evaluationType}
                    class="mt-2"
                    items={evaluationTypes}
                    required
            />
        </Label>
    </div>
    <div>
        <Label
        >Estudiante
            <Select bind:value={evaluation.student} class="mt-2" items={students} required/>
        </Label>
    </div>
    <div>
        <Label
        >Asignatura
            <Select bind:value={evaluation.subject} class="mt-2" items={subjects} required/>
        </Label>
    </div>
    <div>
        <Label for="evaluationDate"
        >Fecha
            <Input
                    bind:value={evaluation.evaluationDate}
                    class={defaultClass}
                    id="evaluationDate"
                    required
                    type="date"
            />
        </Label>
    </div>
</GenericForm>
