<script>
	import UserInput from '$lib/components/forms/login/UserInput.svelte';
	import PasswordInput from '$lib/components/forms/login/PasswordInput.svelte';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { loggedUser, view, popup } from '$lib/stores/stores.js';

	let form;
	let login = {
		username: '',
		password: ''
	};
	let authServ = authService.getInstance();

	const handleLogin = async () => {
		if (form.reportValidity()) {
			const { id_user, username, id_role } = await authServ.login(login);
			login.username = '';
			login.password = '';

			console.log(id_user, username, id_role);

			if (id_user && username && id_role) {
				const role_name = await authServ.getRoleName(id_role);
				console.log(role_name);
				$loggedUser = {
					id_user,
					username,
					role_name,
					id_role
				};
			}
		}
		let routes = authServ.getAuthorizedRoutes();
		if (routes.length > 0) $view = routes[0];
		else {
			$view = '/auth/login';
			$popup = { type: 'error', message: 'ERROR' };
		}
		await goto($view);
	};
</script>

<form class="space-y-6" action="#" bind:this={form} on:submit|preventDefault={handleLogin}>
	<h3 class="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white">Iniciar sesión</h3>
	<UserInput bind:username={login.username} />
	<PasswordInput bind:password={login.password} />
	<Button type="submit" class="w-full">Ingrese a su cuenta</Button>
</form>
