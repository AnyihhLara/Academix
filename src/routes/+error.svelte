<script>
	import { page } from '$app/stores';
	import ErrorPage from '$lib/components/shared/ErrorPage.svelte';
	import { t } from '$lib/stores/stores.js';

	
</script>

<div class="flex justify-center items-center min-h-screen">
	{#if $page.error && $page.error.message === 'Not Found'}
		<ErrorPage>
			<span slot="error-number">404</span>
			<span slot="error-title">{$t('Página No Encontrada')}</span>
			<span slot="error-info"
				>{$t(
					'Lo siento, no podemos encontrar esa página. Encontrarás mucho para explorar en la página de inicio.'
				)}</span
			>
		</ErrorPage>
	{:else if $page.error.message === 'Error: 401'}
		<ErrorPage>
			<span slot="error-number">401</span>
			<span slot="error-title">{$t('Acceso Denegado.')}</span>
			<span slot="error-info"
				>{$t(
					'Lo siento, no tienes autorización para acceder a esta página. Puedes explorar otras áreas en el sitio web.'
				)}</span
			>
		</ErrorPage>
	{/if}
</div>
