<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';


	onMount(() => {
		goto($page.data.view)
	})
</script>