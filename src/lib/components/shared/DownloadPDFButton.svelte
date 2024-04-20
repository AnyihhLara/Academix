<script>
	import { Button } from 'flowbite-svelte';
	import { t } from '$lib/stores/stores.js';
</script>

<div class="flex xs:justify-start xs:pl-8 lg:justify-end lg:pr-8">
	<Button on:click size="sm">{$t('Descargar PDF')}</Button>
</div>
