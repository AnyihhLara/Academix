<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import PasswordInput from './login/PasswordInput.svelte';
	import userService from '$lib/services/UserService.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import roleService from '$lib/services/RoleService.js';
	import studentService from '$lib/services/StudentService.js';
	import { t } from '$lib/stores/stores.js';

	onMount(async () => {
		if (action !== 'Delete') {
			let roleServ = roleService.getInstance();
			roles = await roleServ.getRoles();
			roles = roles.map(({ role_id, role_name }) => ({ value: role_id, name: role_name }));
		}
		await resetForm();
	});

	export let action;
	export let item = null;
	let tableName = 'Usuario',
		defaultClass = 'mt-2',
		user = { username: '', password: '', role: null, student_id: null };
	let roles, students;
	let userServ = userService.getInstance();
	let studentServ = studentService.getInstance();
	const dispatch = createEventDispatcher();

	let selectedRole;
	$: if (user.role && roles) {
		selectedRole = roles.find(({ value }) => value === user.role);
	}

	let selectableStudents;
	$: if (selectedRole && selectedRole.name === 'Estudiante' && students) {
		selectableStudents = students.filter(({ user_id }) => user_id === null);
		selectableStudents = selectableStudents.map(({ student_id, student_code }) => ({
			value: student_id,
			name: student_code
		}));

		if (user.student_id) {
			selectableStudents.push({value: item.student_id, name: item.code});
		}
	}

	async function createItem() {
		let { user_id } = await userServ.createUser(user.username, user.password, user.role);

		if (user.student_id) await assignStudentToUser(user.student_id, user_id);
		dispatch('created');
	}

	async function updateItem() {
		await userServ.updateUser(item.user_id, user.username, user.password, user.role);

		if (item.code !== item.user_id && item.code !== '-') {
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
		if (item) {
			let {
				user_name,
				role_id,
				preferred_language,
				role_name,
				student_id,
				student_code
			} = await userServ.getUser(item.user_id);
			item.user_name = user_name;
			item.role_id = role_id;
			item.preferred_language = preferred_language;
			item.role_name = role_name;
			item.student_id = student_id;
			item.code = student_code;

			user.username = item.user_name;
			user.password = '';
			user.role = item.role_id;
			user.role_name = item.role_name;
			user.student_id = item.student_id;
		} else {
			user = { username: '', password: '', role: null, student_id: null };
		}
		students = await studentServ.getStudents();
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for="name"
			>{$t('Nombre de usuario')}
			<Input
				bind:value={user.username}
				class={defaultClass}
				id="name"
				placeholder={$t('Nombre del usuario')}
				required
				type="text"
			/>
		</Label>
	</div>
	<div>
		<PasswordInput bind:password={user.password} />
	</div>

	<div>
		<Label
			>{$t('Rol')}
			<Select
				bind:value={user.role}
				class={defaultClass}
				items={roles}
				placeholder={$t('Selecciona el rol del usuario')}
				required
			/>
		</Label>
	</div>
	{#if selectedRole && selectedRole.name === 'Estudiante' && !(selectableStudents.length === 0)}
		<div>
			<Label
				>{$t('Estudiante')}
				<Select
					bind:value={user.student_id}
					class="mt-2"
					items={selectableStudents}
					placeholder={$t('Selecciona al estudiante para este usuario')}
					required
				/>
			</Label>
		</div>
	{/if}
	{#if selectedRole && selectedRole.name === 'Estudiante' && (selectableStudents.length === 0)}
		<Label>No hay estudiante disponible que no tenga usuario asignado</Label>
	{/if}
</GenericForm>
