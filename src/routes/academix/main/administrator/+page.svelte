<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { view } from '$lib/stores/stores.js';
	import { onMount } from 'svelte';

	onMount(() => {
		let authServ = authService.getInstance();
		let routes = [];
		if (browser) {
			routes = authServ.getAuthorizedRoutes();
			if (!routes.includes($page.url.pathname)) {
				$view = routes[0];
				goto($view);
			}
		}
	});
	let users = [],
		filters = [
			{
				name: 'Rol',
				key: 'role',
				options: ['Administrador', 'Estudiante', 'Profesor', 'Secretaria'],
				selectedOptions: []
			}
		];
</script>

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
		Módulo Administrador
	</h1>
	<Table tableName="Usuarios" items={users} {filters}></Table>
</section>
