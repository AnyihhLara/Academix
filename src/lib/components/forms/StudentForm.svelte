<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import studentService from "$lib/services/StudentService.js";
	import {createEventDispatcher} from "svelte";

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
			academicSituation: '',
			unenrollmentReason: '',
			academicYear: 0,
			group: 0
		};
	let sexes, years, groups, academicSituations, unenrollmentReasons;
	let studentServ = studentService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		console.log('create')
		await studentServ.createStudent(
				student.name,
				student.lastname,
				'F',  // student.sex,
				student.municipality,
				student.code,
				2,  // student.academicSituation,
				5,  // student.group,
				3,  // student.academicYear,
				null,  //student.unenrollmentReason
				null  //user_id
		);
		dispatch('created');
	}
	async function updateItem() {
		await studentServ.updateStudent(
				item.student_id,
				student.name,
				student.lastname,
				'F',  // student.sex,
				student.municipality,
				student.code,
				2,  // student.academicSituation,
				5,  // student.group,
				3,  // student.academicYear,
				null,  //student.unenrollmentReason
				null  //user_id
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
			academicSituation: '',
			unenrollmentReason: '',
			academicYear: 0,
			group: 0
		};
	}

	//TODO: Put the ''required'' in the inputs that need it too
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="code">
			Código
			<Input
				type="text"
				id="code"
				placeholder="Código del estudiante"
				class={defaultClass}
				bind:value={student.code}
				required
			/>
		</Label>
	</div>
	<div>
		<Label for="name">
			Nombre
			<Input
				type="text"
				id="name"
				placeholder="Nombre del estudiante"
				class={defaultClass}
				bind:value={student.name}
				required
			/>
		</Label>
	</div>

	<div>
		<Label for="lastname">
			Apellidos
			<Input
				type="text"
				id="lastname"
				placeholder="Apellidos del estudiante"
				class={defaultClass}
				bind:value={student.lastname}
				required
			/>
		</Label>
	</div>
	<div>
		<Label
			>Sexo
			<Select class="mt-2" items={sexes} bind:value={student.sex} />
		</Label>
	</div>
	<div>
		<Label for="municipality">
			Municipio
			<Input
				type="text"
				id="municipality"
				placeholder="Municipio del estudiante"
				class={defaultClass}
				bind:value={student.municipality}
				required
			/>
		</Label>
	</div>
	<div>
		<Label
			>Año
			<Select class={defaultClass} items={years} bind:value={student.academicYear} />
		</Label>
	</div>
	<div>
		<Label
			>Grupo
			<Select class={defaultClass} items={groups} bind:value={student.group} />
		</Label>
	</div>
	<div>
		<Label
			>Situación Académica
			<Select
				class={defaultClass}
				items={academicSituations}
				bind:value={student.academicSituation}
			/>
		</Label>
	</div>
	<div>
		<Label
			>Causa de Baja
			<Select
				class={defaultClass}
				items={unenrollmentReasons}
				bind:value={student.unenrollmentReason}
			/>
		</Label>
	</div>
</GenericForm>
<!-- see later inputs to disable (year, unenrollmentReason, etc) -->
