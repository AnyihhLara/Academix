<script>
	import UserInput from '$lib/components/login/UserInput.svelte';
	import PasswordInput from '$lib/components/login/PasswordInput.svelte';
  import { Button } from 'flowbite-svelte'
</script>

<form class="space-y-6" action="#" on:submit|preventDefault>
	<h3 class="mb-4 text-xl font-medium text-center text-gray-900 dark:text-white">Iniciar sesión</h3>
	<UserInput />
	<PasswordInput />
	<Button type="submit" class="w-full">Ingrese a su cuenta</Button>
</form>


