<script>
	import { Label } from 'flowbite-svelte';
</script>

<div class="flex flex-row items-center">
	<Label class="font-bold"><slot /></Label>
	<span class="mx-2"><slot name="info" /></span>
</div>
