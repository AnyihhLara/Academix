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
	});

	export let action;
	export let item = null;

	let tableName = 'estudiante',
		defaultClass = 'mt-2',
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
		console.log('create');
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

	//TODO: Put the ''required'' in the inputs that need it too
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for='code'>
			Código
			<Input
				bind:value={student.code}
				class={defaultClass}
				id='code'
				placeholder='Código del estudiante'
				required
				type='text'
			/>
		</Label>
	</div>
	<div>
		<Label for='name'>
			Nombre
			<Input
				bind:value={student.name}
				class={defaultClass}
				id='name'
				placeholder='Nombre del estudiante'
				required
				type='text'
			/>
		</Label>
	</div>

	<div>
		<Label for='lastname'>
			Apellidos
			<Input
				bind:value={student.lastname}
				class={defaultClass}
				id='lastname'
				placeholder='Apellidos del estudiante'
				required
				type='text'
			/>
		</Label>
	</div>
	<div>
		<Label
		>Sexo
			<Select bind:value={student.sex} class='mt-2' items={sexes} required />
		</Label>
	</div>
	<div>
		<Label for='municipality'>
			Municipio
			<Input
				bind:value={student.municipality}
				class={defaultClass}
				id='municipality'
				placeholder='Municipio del estudiante'
				required
				type='text'
			/>
		</Label>
	</div>
	<div>
		<Label
		>Año
			<Select bind:value={student.academicYear} class={defaultClass} items={years} required />
		</Label>
	</div>
	{#if selectableGroups}
		<div>
			<Label
			>Grupo
				<Select bind:value={student.group} class={defaultClass} items={selectableGroups} required />
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
					required
				/>
			</Label>
		</div>
	{/if}
</GenericForm>
<!-- see later inputs to disable (year, unenrollmentReason, etc) -->
