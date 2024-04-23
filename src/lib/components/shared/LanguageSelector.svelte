<script>
	import { locale, locales } from '$lib/stores/stores.js';
	import userService from '$lib/services/UserService.js';
	import { Select } from 'flowbite-svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	onMount(async () => {
		let userServ = userService.getInstance();

		let { get_preferred_language } = await userServ.getPreferredLanguage($page.data.user.id_user);

		if (get_preferred_language) {
			$locale = get_preferred_language;
		} else {
			$locale = 'es';
			await changeLanguage($locale);
		}
	});
	let userServ = userService.getInstance();
	let languages = locales.map((locale) => ({ value: locale, name: locale }));

	async function changeLanguage(language) {
		await userServ.changeLanguage($page.data.user.id_user, language);
	}
</script>

<Select
	class="xs:text-xs lg:text-sm lg:w-16"
	size="sm"
	items={languages}
	bind:value={$locale}
	placeholder=""
	on:change={changeLanguage($locale)}
/>
