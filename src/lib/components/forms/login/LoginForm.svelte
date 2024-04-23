<script>
	import UserInput from '$lib/components/forms/login/UserInput.svelte';
	import PasswordInput from '$lib/components/forms/login/PasswordInput.svelte';
	import { Button } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { t } from '$lib/stores/stores.js';

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

				if (user.id_user && user.username && user.id_role) {
					role_name = user.role_name;
				}
			} catch (e) {
				console.log(e);

				error = e.message;
				login.username = '';
				login.password = '';
			}
			console.log(error);

			if (error && error !== 'Usuario o contraseña incorrectos') {
				error = 'Algo salió mal';
			}
			console.log(error);
		}
		let routes = authServ.getAuthorizedRoutes(role_name);
		if (routes.length > 0) {
			await goto(routes[0]);
		} else {
			await goto('/');
		}
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
		<div class="text-center mt-7">
			<span class="text-red-600 font-medium dark:text-red-300">{$t(error)}</span>
		</div>
	{/if}
</form>
