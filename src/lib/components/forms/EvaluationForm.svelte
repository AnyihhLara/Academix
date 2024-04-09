<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import evaluationService from '$lib/services/EvaluationService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import evaluationTypeService from '$lib/services/EvaluationTypeService.js';
	import studentService from '$lib/services/StudentService.js';
	import subjectService from '$lib/services/SubjectService.js';
	import { t } from '$lib/stores/stores.js';

	onMount(async () => {
		if (action !== 'Delete') {
			let evaluationTypeServ = evaluationTypeService.getInstance();
			let studentServ = studentService.getInstance();
			let subjectServ = subjectService.getInstance();
			evaluationNumericalValues = await evaluationTypeServ.getEvaluationTypes();
			evaluationNumericalValues = evaluationNumericalValues.map(
				({ evaluation_type_id, evaluation_numerical_value }) => ({
					value: evaluation_type_id,
					name: evaluation_numerical_value
				})
			);
			students = await studentServ.getStudents();
			students = students.map(({ student_id, student_code }) => ({
				value: student_id,
				name: student_code
			}));
			subjects = await subjectServ.getSubjects();
			subjects = subjects.map(({ subject_id, subject_name }) => ({
				value: subject_id,
				name: subject_name
			}));
		}
		await resetForm();
	});

	export let action;
	export let item = null;

	let tableName = 'Evaluación',
		defaultClass = 'mt-2',
		evaluation = { evaluationType: '', student: '', subject: '', evaluationDate: '' };
	let evaluationNumericalValues, students, subjects;
	let evaluationServ = evaluationService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		isValidEvaluationDate(evaluation.evaluationDate);
		await evaluationServ.createEvaluation(
			evaluation.evaluationType,
			evaluation.student,
			evaluation.subject,
			evaluation.evaluationDate
		);
		dispatch('created');
	}

	async function updateItem() {
		isValidEvaluationDate(evaluation.evaluationDate);
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

	async function resetForm() {
		if (item) {
			let { evaluation_id, student_id, evaluation_date, subject_id, evaluation_type_id } =
				await evaluationServ.getEvaluation(item.evaluation_id);
			item.evaluation_id = Number(evaluation_id);
			item.student_id = Number(student_id);
			item.evaluation_date = evaluation_date;
			item.subject_id = Number(subject_id);
			item.evaluation_type_id = Number(evaluation_type_id);

			evaluation.student = item.student_id;
			evaluation.subject = item.subject_id;
			evaluation.evaluationDate = item.evaluation_date;
			evaluation.evaluationType = item.evaluation_type_id;
		} else {
			evaluation = { name: '' };
		}
	}
	function isValidEvaluationDate(evaluationDate) {
		let actualDate = new Date().toISOString().split('T')[0];
		let dateParts = evaluationDate.split('-');
		let inDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
		if (inDate > new Date(actualDate)) {
			throw new Error('La fecha de la evaluación no puede ser mayor que la fecha actual.');
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label
			>{$t('Nota')}
			<Select
				bind:value={evaluation.evaluationType}
				class="mt-2"
				items={evaluationNumericalValues}
				placeholder={$t('Selecciona la nota de la evaluación')}
				required
			/>
		</Label>
	</div>
	<div>
		<Label
			>{$t("Estudiante")}
			<Select
				bind:value={evaluation.student}
				class="mt-2"
				items={students}
				placeholder={$t('Selecciona al estudiante de la evaluación')}
				required
			/>
		</Label>
	</div>
	<div>
		<Label
			>{$t("Asignatura")}
			<Select
				bind:value={evaluation.subject}
				class="mt-2"
				items={subjects}
				placeholder={$t('Selecciona la asignatura de la evaluación')}
				required
			/>
		</Label>
	</div>
	<div>
		<Label for="evaluationDate"
			>{$t("Fecha")}
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
