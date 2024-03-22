<script>
	import { loggedIn, view } from '$lib/stores/stores.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	onMount(async () => {
		if ($view === '/' || !$loggedIn || !data.user || !data.pass) {
			$view = '/auth/login';
		}
		await goto($view);
	});
</script>
