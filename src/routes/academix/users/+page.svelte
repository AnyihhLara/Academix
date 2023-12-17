<script>
	import Table from '$lib/components/shared/Table.svelte';
	import userService from '$lib/services/UserService.js';
	import studentService from '$lib/services/StudentService.js';
	import { onMount } from 'svelte';

	onMount(() => {
		refreshItems();
	});

	let users = [],
		filters = [
			{
				name: 'Rol',
				key: 'role',
				options: ['Administrador', 'Estudiante', 'Profesor', 'Secretario'],
				selectedOptions: []
			}
		],
		isFilterable = true;
	let tableName = 'Usuarios';
	let userServ = userService.getInstance();
	let studentServ = studentService.getInstance();

	const refreshItems = () => {
		userServ.getUsers().then(async (i) => {
			let students = await studentServ.getStudents();
			users = i.map((user) => {
				let student = students.find(({ user_id }) => user_id === user.user_id);

				if (student) {
					user['code'] = student.student_code;
				} else {
					user['code'] = '-';
				}

				return user;
			});
		});
	};
</script>

<Table {filters} {isFilterable} items={users} {refreshItems} {tableName} />
