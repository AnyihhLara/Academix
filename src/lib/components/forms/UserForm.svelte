<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import PasswordInput from './login/PasswordInput.svelte';
	import userService from '$lib/services/UserService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import roleService from '$lib/services/RoleService.js';
	import studentService from '$lib/services/StudentService.js';

	onMount(async () => {
		if (action !== 'Delete') {
			let roleServ = roleService.getInstance();
			roles = await roleServ.getRoles();
			roles = roles.map(({ role_id, role_name }) => ({ value: role_id, name: role_name }));
			students = await studentServ.getStudents();
		}
	});

	export let action;
	export let item = null;
	let tableName = 'usuario',
		defaultClass = 'mt-2',
		user = { username: '', password: '', role: null, student_id: null };
	let roles, students;
	let userServ = userService.getInstance();
	let studentServ = studentService.getInstance();
	const dispatch = createEventDispatcher();

	let selectedRole;
	$: if (user.role) {
		selectedRole = roles.find(({ value }) => value === user.role);
	}

	let selectableStudents;
	$: if (selectedRole && selectedRole.name === 'Estudiante') {
		selectableStudents = students.filter(({ user_id }) => user_id === null);
		selectableStudents = selectableStudents.map(
			({ student_id, student_code }) => ({ value: student_id, name: student_code })
		);
	}

	async function createItem() {
		let { user_id } = await userServ.createUser(
			user.username,
			user.password,
			user.role
		);

		if (user.student_id) await assignStudentToUser(user.student_id, user_id);
		dispatch('created');
	}

	async function updateItem() {
		await userServ.updateUser(
			item.user_id,
			user.username,
			user.password,
			user.role
		);

		if (item.code !== item.user_id) {
			let { student_id } = students.find(({ student_code }) => student_code === item.code);
			await assignStudentToUser(student_id, null);
			await assignStudentToUser(user.student_id, item.user_id);
		}
		dispatch('updated');
	}

	async function deleteItem() {
		await userServ.deleteUser(item.user_id);
		dispatch('deleted');
	}

	async function assignStudentToUser(student_id, user_id) {
		let student = await studentServ.getStudent(student_id);

		await studentServ.updateStudent(
			student.student_id,
			student.student_name,
			student.lastname,
			student.sex,
			student.municipality,
			student.student_code,
			student.academic_situation_id,
			student.group_id,
			student.year_id,
			student.unenrollment_reason_id,
			user_id
		);
	}

	async function resetForm() {
		user = { username: '', passsword: '', role: null, student_id: null };
		students = await studentServ.getStudents();
	}

</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for='name'
		>Nombre de usuario
			<Input
				bind:value={user.username}
				class={defaultClass}
				id='name'
				placeholder='Nombre del usuario'
				required
				type='text'
			/>
		</Label>
	</div>
	<div>
		<PasswordInput bind:password={user.password} />
	</div>

	<div>
		<Label
		>Rol
			<Select
				bind:value={user.role}
				class={defaultClass}
				items={roles}
				placeholder='Selecciona el rol del usuario'
				required
			/>
		</Label>
	</div>
	{#if selectedRole && selectedRole.name === 'Estudiante'}
		<div>
			<Label
			>Estudiante
				<Select
					bind:value={user.student_id}
					class='mt-2'
					items={selectableStudents}
					placeholder='Selecciona al estudiante para este usuario'
					required />
			</Label>
		</div>
	{/if}
</GenericForm>
