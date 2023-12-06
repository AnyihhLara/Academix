<script>
	import '../app.css';
	import NavBar from '$lib/components/shared/NavBar.svelte';
</script>

<div class="min-h-screen min-w-max bg-gradient-to-tl from-rose-300 via-rose-200 to-rose-100
	dark:from-primary-950 dark:to-primary-900">
	<NavBar />
	<slot />
</div>
