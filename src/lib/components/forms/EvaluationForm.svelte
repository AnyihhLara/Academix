<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import evaluationService from '$lib/services/EvaluationService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import evaluationTypeService from '$lib/services/EvaluationTypeService.js';
	import studentService from '$lib/services/StudentService.js';
	import subjectService from '$lib/services/SubjectService.js';

	onMount(async () => {
			if (action !== 'Delete') {
				let evaluationTypeServ = evaluationTypeService.getInstance();
				let studentServ = studentService.getInstance();
				let subjectServ = subjectService.getInstance();
				evaluationNumericalValues = await evaluationTypeServ.getEvaluationTypes();
				evaluationNumericalValues = evaluationNumericalValues.map(
					({ evaluation_type_id, evaluation_numerical_value }) =>
						({ value: evaluation_type_id, name: evaluation_numerical_value })
				);
				students = await studentServ.getStudents();
				students = students.map(
					({ student_id, student_code }) =>
						({ value: student_id, name: student_code })
				);
				subjects = await subjectServ.getSubjects();
				subjects = subjects.map(
					({ subject_id, subject_name }) =>
						({ value: subject_id, name: subject_name })
				);
			}
		}
	);

	export let action;
	export let item = null;

	let tableName = 'evaluación',
		defaultClass = 'mt-2',
		evaluation = { evaluationType: '', student: '', subject: '', evaluationDate: '' };
	let evaluationNumericalValues, students, subjects;
	let evaluationServ = evaluationService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await evaluationServ.createEvaluation(
			evaluation.evaluationType,
			evaluation.student,
			evaluation.subject,
			evaluation.evaluationDate
		);
		dispatch('created');
	}

	async function updateItem() {
		await evaluationServ.updateEvaluation(
			item.evaluation_id,
			evaluation.evaluationType,
			evaluation.student,
			evaluation.subject,
			evaluation.evaluationDate
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await evaluationServ.deleteEvaluation(item.evaluation_id);
		dispatch('deleted');
	}

	function resetForm() {
		evaluation = { evaluationType: '', student: '', subject: '', evaluationDate: '' };
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label
		>Nota
			<Select
				bind:value={evaluation.evaluationType}
				class='mt-2'
				items={evaluationNumericalValues}
				placeholder='Selecciona la nota de la evaluación'
				required
			/>
		</Label>
	</div>
	<div>
		<Label
		>Estudiante
			<Select
				bind:value={evaluation.student}
				class='mt-2'
				items={students}
				placeholder='Selecciona al estudiante de la evaluación'
				required />
		</Label>
	</div>
	<div>
		<Label
		>Asignatura
			<Select
				bind:value={evaluation.subject}
				class='mt-2'
				items={subjects}
				placeholder='Selecciona la asignatura de la evaluación'
				required />
		</Label>
	</div>
	<div>
		<Label for='evaluationDate'
		>Fecha
			<Input
				bind:value={evaluation.evaluationDate}
				class={defaultClass}
				id='evaluationDate'
				required
				type='date'
			/>
		</Label>
	</div>
</GenericForm>
