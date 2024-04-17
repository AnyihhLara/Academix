<script>
	import '../app.css';
	// import { Footer, FooterCopyright } from 'flowbite-svelte';
	import { t } from '$lib/stores/stores.js';
	$: copyrightMessage = $t('Todos los derechos reservados') + '.';
</script>

<div
	class="min-h-screen min-w-max bg-gradient-to-tl from-rose-300 via-rose-200 to-rose-100
	dark:from-primary-950 dark:to-primary-900"
>
	<slot />
	<!-- <Footer class="justify-self-end">
		<FooterCopyright
			spanClass="block xs:text-xs sm:text-sm font-semibold text-center text-primary-950 dark:text-primary-100"
			href="/"
			by="Academix™"
			year={2023}
			{copyrightMessage}
		/>
	</Footer> -->
</div>

