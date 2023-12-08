<script>
    import Table from '$lib/components/shared/Table.svelte';
    let users=[];
</script>

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
		Módulo Administrador
	</h1>
	<Table tableName="Usuarios" items={users}></Table>
</section>
