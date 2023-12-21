<script>
	import Table from '$lib/components/shared/Table.svelte';
	import userService from '$lib/services/UserService.js';
	import studentService from '$lib/services/StudentService.js';
	import roleService from '$lib/services/RoleService.js';
	import { onMount } from 'svelte';

	onMount(async () => {
		let roleServ = roleService.getInstance();
		roles = await roleServ.getRoles();
		roles = roles.map(({ role_name }) => (role_name ));
		filters.find((filter) => filter.key === 'role_name').options = roles;
		console.log(filters)
		refreshItems();
	});

	let users = [], roles,
		filters = [
			{
				name: 'Rol',
				key: 'role_name',
				options: [],
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
