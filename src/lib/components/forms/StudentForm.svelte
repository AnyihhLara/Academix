<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import studentService from '$lib/services/StudentService.js';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import yearService from '$lib/services/YearService.js';
	import academicSituationService from '$lib/services/AcademicSituationService.js';
	import unenrollmentReasonService from '$lib/services/UnenrollmentReasonService.js';
	import { currentSchoolYear } from '$lib/stores/stores.js';

	onMount(async () => {
		if (action !== 'Delete') {
			let yearServ = yearService.getInstance();
			let academicSituationServ = academicSituationService.getInstance();
			let studentsGroupServ = studentsGroupService.getInstance();
			let unenrollmentReasonServ = unenrollmentReasonService.getInstance();
			years = await yearServ.getYears();
			years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
			years = years.map(({ year_id, year }) => ({ value: year_id, name: year }));
			groups = await studentsGroupServ.getStudentsGroups();
			sexes = [
				{ value: 'M', name: 'Masculino' },
				{ value: 'F', name: 'Femenino' }
			];
			academicSituations = await academicSituationServ.getAcademicSituations();
			academicSituations = academicSituations.map(
				({ academic_situation_id, academic_situation_name }) => ({
					value: academic_situation_id,
					name: academic_situation_name
				})
			);
			unenrollmentReasons = await unenrollmentReasonServ.getUnenrollmentReasons();
			unenrollmentReasons = unenrollmentReasons.map(
				({ unenrollment_reason_id, unenrollment_reason_name }) => ({
					value: unenrollment_reason_id,
					name: unenrollment_reason_name
				})
			);
		}
		// if (action === 'Update') {
		// disabledYear = true;
		// academicSituations = [{ value: 'Baja', name: 'Baja' }];
		//see later groups and academic situations
		// }
	});
	export let action;
	export let item = null;

	let tableName = 'estudiante',
		defaultClass = 'mt-2',
		disabledYear = false,
		student = {
			code: '',
			name: '',
			lastname: '',
			sex: '',
			municipality: '',
			academicSituation: null,
			unenrollmentReason: null,
			academicYear: null,
			group: null
		};
	let sexes, years, groups, academicSituations, unenrollmentReasons;
	let studentServ = studentService.getInstance();
	const dispatch = createEventDispatcher();
	let situation;
	$: if (student.academicSituation) {
		situation = academicSituations.find(({ value }) => value === student.academicSituation);
	}

	let selectableGroups;
	$: if (student.academicYear) {
		selectableGroups = groups.filter(({ year_id }) => year_id === student.academicYear);
		selectableGroups = selectableGroups.map(({ group_id, group_number }) => ({
			value: group_id,
			name: group_number
		}));
	}

	async function createItem() {
		isValidCode(student.code);
		await studentServ.createStudent(
			student.name,
			student.lastname,
			student.sex,
			student.municipality,
			student.code,
			student.academicSituation,
			student.group,
			student.academicYear,
			student.unenrollmentReason,
			null //user_id
		);
		dispatch('created');
	}

	async function updateItem() {
		isValidCode(student.code);
		await studentServ.updateStudent(
			item.student_id,
			student.name,
			student.lastname,
			student.sex,
			student.municipality,
			student.code,
			student.academicSituation,
			student.group,
			student.academicYear,
			student.unenrollmentReason,
			item.user_id
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await studentServ.deleteStudent(item.student_id);
		dispatch('deleted');
	}

	function resetForm() {
		student = {
			code: '',
			name: '',
			lastname: '',
			sex: '',
			municipality: '',
			academicSituation: null,
			unenrollmentReason: null,
			academicYear: null,
			group: null
		};
	}
	function isValidCode(studentCode) {
		let valid = /\D/;
		if (studentCode.length < 11) {
			throw new Error('El código del estudiante tiene que tener 11 dígitos.');
		}
		if (valid.test(studentCode))
			throw new Error('El código del estudiante solo puede contener números.');
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for="code">
			Código
			<Input
				bind:value={student.code}
				class={defaultClass}
				id="code"
				placeholder="Código del estudiante"
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<Label for="name">
			Nombre
			<Input
				bind:value={student.name}
				class={defaultClass}
				id="name"
				placeholder="Nombre del estudiante"
				required
				type="text"
			/>
		</Label>
	</div>

	<div>
		<Label for="lastname">
			Apellidos
			<Input
				bind:value={student.lastname}
				class={defaultClass}
				id="lastname"
				placeholder="Apellidos del estudiante"
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<Label
			>Sexo
			<Select
				bind:value={student.sex}
				class={defaultClass}
				items={sexes}
				placeholder="Selecciona el sexo del estudiante"
				required
			/>
		</Label>
	</div>
	<div>
		<Label for="municipality">
			Municipio
			<Input
				bind:value={student.municipality}
				class={defaultClass}
				id="municipality"
				placeholder="Municipio del estudiante"
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<Label
			>Año
			<Select
				bind:value={student.academicYear}
				class={defaultClass}
				items={years}
				placeholder="Primero selecciona el año académico del estudiante..."
				required
				disabled={disabledYear}
				readonly={disabledYear}
			/>
		</Label>
	</div>
	{#if selectableGroups}
		<div>
			<Label
				>Grupo
				<Select
					bind:value={student.group}
					class={defaultClass}
					items={selectableGroups}
					placeholder="...luego selecciona el grupo del estudiante"
					required
				/>
			</Label>
		</div>
	{/if}
	<div>
		<Label
			>Situación Académica
			<Select
				bind:value={student.academicSituation}
				class={defaultClass}
				items={academicSituations}
				placeholder="Selecciona la situación académica del estudiante"
				required
			/>
		</Label>
	</div>
	{#if situation && situation.name === 'Baja'}
		<div>
			<Label
				>Causa de Baja
				<Select
					bind:value={student.unenrollmentReason}
					class={defaultClass}
					items={unenrollmentReasons}
					placeholder="Selecciona la causa de baja del estudiante"
					required
				/>
			</Label>
		</div>
	{/if}
</GenericForm>
