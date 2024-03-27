<script>
	import { locale, locales } from '$lib/stores/stores.js';
	import { Select } from 'flowbite-svelte';

	let languages = locales.map((locale) => ({ value: locale, name: locale }));
</script>

<Select class="w-16" size="sm" items={languages} bind:value={$locale} placeholder="" />
