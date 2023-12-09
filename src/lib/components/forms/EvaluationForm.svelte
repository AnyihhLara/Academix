<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'evaluación',
		defaultClass = 'mt-2',
		evaluation = { evaluationType: '', student: '', subject: '', evaluationDate: '' };
	let evaluationTypes, students, subjects;

	function createItem() {}
	function updateItem() {}
	function deleteItem() {}
	function resetForm() {
		evaluation = { evaluationType: '', student: '', subject: '', evaluationDate: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label
			>Tipo de Evaluación
			<Select
				class="mt-2"
				items={evaluationTypes}
				bind:value={evaluation.evaluationType}
				required
			/>
		</Label>
	</div>
	<div>
		<Label
			>Estudiante
			<Select class="mt-2" items={students} bind:value={evaluation.student} required />
		</Label>
	</div>
	<div>
		<Label
			>Asignatura
			<Select class="mt-2" items={subjects} bind:value={evaluation.subject} required />
		</Label>
	</div>
	<div>
		<Label for="evaluationDate"
			>Fecha
			<Input
				type="date"
				id="evaluationDate"
				class={defaultClass}
				bind:value={evaluation.evaluationDate}
				required
			/>
		</Label>
	</div>
</GenericForm>
