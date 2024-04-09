<script>
	import UserInput from '$lib/components/forms/login/UserInput.svelte';
	import PasswordInput from '$lib/components/forms/login/PasswordInput.svelte';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { loggedIn, view, t } from '$lib/stores/stores.js';

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
				const { user } = await authServ.login(login);
				login.username = '';
				login.password = '';

				if (user.id_user && user.username && user.id_role) {
					role_name = user.role_name;
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
			{$t('Iniciar sesión')}
		</h3>
		<UserInput bind:username={login.username} />
		<PasswordInput bind:password={login.password} />
		<Button class="w-full" type="submit">{$t('Ingrese a su cuenta')}</Button>
	</div>
	{#if error}
		<div class="text-center mt-4">
			<span class="text-red-600 font-medium dark:text-red-300">{$t('Usuario o contraseña incorrectos')}</span>
		</div>
	{/if}
</form>
