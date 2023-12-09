<script>
	import Table from '$lib/components/shared/Table.svelte';
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
</script>

<Table tableName="Usuarios" items={users} {filters} {isFilterable} />
