<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import studentService from '$lib/services/StudentService.js';
	import studentsGroupService from '$lib/services/StudentsGroupService.js';
	import yearService from '$lib/services/YearService.js';
	import academicSituationService from '$lib/services/AcademicSituationService.js';
	import unenrollmentReasonService from '$lib/services/UnenrollmentReasonService.js';
	import { currentSchoolYear, t } from '$lib/stores/stores.js';

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
		await resetForm();
	});
	export let action;
	export let item = null;

	let tableName = 'Estudiante',
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

	async function resetForm() {
		if (item) {
			let {
				student_code,
				student_name,
				lastname,
				sex,
				municipality,
				academic_situation_id,
				unenrollment_reason_id,
				year_id,
				group_id,
				user_id
			} = await studentServ.getStudent(item.student_id);
			item.student_code = student_code;
			item.student_name = student_name;
			item.lastname = lastname;
			item.sex = sex;
			item.municipality = municipality;
			item.academic_situation_id = academic_situation_id;
			item.unenrollment_reason_id = unenrollment_reason_id;
			item.year_id = year_id;
			item.group_id = group_id;
			item.user_id = user_id;

			student.code = item.student_code;
			student.name = item.student_name;
			student.lastname = item.lastname
			student.sex = item.sex;
			student.municipality = item.municipality;
			student.academicSituation = item.academic_situation_id;
			student.unenrollmentReason = item.unenrollment_reason_id;
			student.academicYear = item.year_id;
			student.group = item.group_id;
			student.user_id = item.user_id;
		} else {
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
	}

	function isValidCode(studentCode) {
		let valid = /\D/;
		if (valid.test(studentCode))
			throw new Error('El código del estudiante solo puede contener números.');
		if (studentCode.length < 11) {
			throw new Error('El código del estudiante tiene que tener 11 dígitos.');
		}
		if (studentCode.length > 11) {
			throw new Error('El código del estudiante no puede tener más de 11 dígitos.');
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for="code">
			{$t('Código')}
			<Input
				bind:value={student.code}
				class={defaultClass}
				id="code"
				placeholder={$t('Código del estudiante')}
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<Label for="name">
			{$t('Nombre')}
			<Input
				bind:value={student.name}
				class={defaultClass}
				id="name"
				placeholder={$t('Nombre del estudiante')}
				required
				type="text"
			/>
		</Label>
	</div>

	<div>
		<Label for="lastname">
			{$t('Apellidos')}
			<Input
				bind:value={student.lastname}
				class={defaultClass}
				id="lastname"
				placeholder={$t('Apellidos del estudiante')}
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<Label
			>{$t('Sexo')}
			<Select
				bind:value={student.sex}
				class={defaultClass}
				items={sexes}
				placeholder={$t('Selecciona el sexo del estudiante')}
				required
			/>
		</Label>
	</div>
	<div>
		<Label for="municipality">
			{$t('Municipio')}
			<Input
				bind:value={student.municipality}
				class={defaultClass}
				id="municipality"
				placeholder={$t('Municipio del estudiante')}
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<Label
			>{$t('Año')}
			<Select
				bind:value={student.academicYear}
				class={defaultClass}
				disabled={disabledYear}
				items={years}
				placeholder={$t('Primero selecciona el año académico del estudiante...')}
				readonly={disabledYear}
				required
			/>
		</Label>
	</div>
	{#if selectableGroups}
		<div>
			<Label
				>{$t('Grupo')}
				<Select
					bind:value={student.group}
					class={defaultClass}
					items={selectableGroups}
					placeholder={$t('...luego selecciona el grupo del estudiante')}
					required
				/>
			</Label>
		</div>
	{/if}
	<div>
		<Label
			>{$t('Situación académica')}
			<Select
				bind:value={student.academicSituation}
				class={defaultClass}
				items={academicSituations}
				placeholder={$t('Selecciona la situación académica del estudiante')}
				required
			/>
		</Label>
	</div>
	{#if situation && situation.name === 'Baja'}
		<div>
			<Label
				>{$t('Causa de Baja')}
				<Select
					bind:value={student.unenrollmentReason}
					class={defaultClass}
					items={unenrollmentReasons}
					placeholder={$t('Selecciona la causa de baja del estudiante')}
					required
				/>
			</Label>
		</div>
	{/if}
</GenericForm>
