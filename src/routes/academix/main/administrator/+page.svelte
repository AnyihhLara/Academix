<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { goto } from '$app/navigation';
	import { t } from '$lib/stores/stores.js';

	const gotoUsers = () => {
		goto('/academix/users');
	};
	const gotoRoles = () => {
		goto('/academix/roles');
	};
</script>

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mt-2 mb-6 font-semibold text-primary-950 dark:text-primary-100">
		{$t('Módulos Administrador')}
	</h1>
	<div class="flex justify-center items-center">
		<div class="flex flex-col items-stretch gap-6">
			<Card on:click={gotoUsers}>
				<span slot="title">{$t('Listado de usuarios')}</span>
			</Card>
			<Card on:click={gotoRoles}>
				<span slot="title">{$t('Listado de roles')}</span>
			</Card>
		</div>
	</div>
</section>
