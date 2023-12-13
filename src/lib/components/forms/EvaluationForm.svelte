<script>
	import {Input, Label, Select} from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
    let tableName = 'evaluación',
        defaultClass = 'mt-2',
        evaluation = {evaluationType: '', student: '', subject: '', evaluationDate: ''};
    let evaluationTypes, students, subjects;

    function createItem() {
    }

    function updateItem() {
    }

    function deleteItem() {
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
