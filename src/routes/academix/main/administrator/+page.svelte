<script>
	import Card from '$lib/components/shared/Card.svelte';
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
	let defaultClass = 'flex-row space-y-6';
	let btnText = 'Ver más';
	const gotoUsers = () => {
		goto('/academix/users');
	};
	const gotoRoles = () => {
		goto('/academix/roles');
	};
</script>

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mb-6 font-semibold text-primary-950 dark:text-primary-100">
		Módulos Administrador
	</h1>
	<div class="{defaultClass} justify-center items-center">
		<div class="flex justify-center">
			<div class={defaultClass}>
				<Card on:click={gotoUsers}>
					<span slot="tittle">Listado de usuarios</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card on:click={gotoRoles}>
					<span slot="tittle">Listado de roles</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
		</div>
	</div>
</section>
