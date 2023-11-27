<script>
	import { Label } from 'flowbite-svelte';
</script>

<Label class="space-y-2">
	<span><slot name="label-text" /></span>
	<slot />
</Label>
