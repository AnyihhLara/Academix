<script>
	import UserInput from '$lib/components/forms/login/UserInput.svelte';
	import PasswordInput from '$lib/components/forms/login/PasswordInput.svelte';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { loggedIn, view } from '$lib/stores/stores.js';

	let form, error;
	let login = {
		username: '',
		password: ''
	};
	let authServ = authService.getInstance();

	const handleLogin = async () => {
		let role_name = '';
		if (form.reportValidity()) {
			try {
				const { id_user, username, id_role } = await authServ.login(login);
				login.username = '';
				login.password = '';

				if (id_user && username && id_role) {
					role_name = await authServ.getRoleName(id_role);
				}
			} catch (e) {
				error = e.message;
			}
		}
		let routes = authServ.getAuthorizedRoutes(role_name);
		if (routes.length > 0) {
			$view = routes[0];
			$loggedIn = true;
		} else {
			$view = '/auth/login';
		}
		await goto($view);
	};
</script>

<form action="#" bind:this={form} on:submit|preventDefault={handleLogin}>
	<div class="space-y-6">
		<h3 class="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white">
			Iniciar sesión
		</h3>
		<UserInput bind:username={login.username} />
		<PasswordInput bind:password={login.password} />
		<Button class="w-full" type="submit">Ingrese a su cuenta</Button>
	</div>
	{#if error}
		<div class="text-center mt-4">
			<span class="text-red-600 font-medium">Usuario o contraseña incorrectos</span>
		</div>
	{/if}
</form>
