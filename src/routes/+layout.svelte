<script>
	import '../app.css';
	import { Footer, FooterCopyright } from 'flowbite-svelte';
</script>

<div
	class="min-h-screen min-w-max bg-gradient-to-tl from-rose-300 via-rose-200 to-rose-100
	dark:from-primary-950 dark:to-primary-900"
>
	<slot />
	<div class="fixed bottom-0 w-full">
		<Footer>
			<FooterCopyright spanClass="block mb-1 text-sm font-semibold sm:text-center text-primary-950 dark:text-primary-100" href="/" by="Academix™" year={2023} />
		</Footer>
	</div>
</div>
