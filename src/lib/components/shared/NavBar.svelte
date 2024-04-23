<script>
	import {
		Avatar,
		DarkMode,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		NavBrand
	} from 'flowbite-svelte';
	import { BuildingSolid, MoonSolid, SunSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { locale, t } from '$lib/stores/stores.js';
	import LanguageSelector from './LanguageSelector.svelte';
	import authService from '$lib/services/AuthService.js';

	async function handleLogout() {
		try {
			let authServ = authService.getInstance();
			await authServ.logout();
		} catch (e) {
			console.log(e);
		} finally {
			await goto('/auth/login', { invalidateAll: true });
			$locale = 'es';
		}
	}
</script>

<nav
	class="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border-gray-100 dark:border-gray-700 divide-gray-100 dark:divide-gray-700 py-2.5 w-full flex xs:justify-start xs:gap-4 lg:gap-0 lg:justify-between shadow-xl"
>
	<NavBrand class="xs:ml-2 sm:ml-5 lg:ml-8 lg:mr-2" href="/">
		<BuildingSolid class="mr-3 h-6 sm:h-9" />
		<span class="self-center whitespace-nowrap text-xl font-bold dark:text-white">ACADEMIX</span>
	</NavBrand>
	<div class="flex items-center xs:gap-1 lg:gap-4 mx-3">
		<Avatar id="avatar-menu" size="sm" />
		<DarkMode class="text-lg">
			<svelte:fragment slot="lightIcon">
				<SunSolid />
			</svelte:fragment>
			<svelte:fragment slot="darkIcon">
				<MoonSolid />
			</svelte:fragment>
		</DarkMode>
		<LanguageSelector />
	</div>
</nav>
<Dropdown placement="bottom" triggeredBy="#avatar-menu">
	<DropdownHeader>
		<span class="block text-sm"> {$t('Usuario')} </span>
		<span class="block truncate text-sm font-medium"> {$page.data.user.username} </span>
	</DropdownHeader>
	<DropdownItem on:click={handleLogout}>
		<span class="font-medium text-red-600 text-sm w-full">{$t('Cerrar sesión')}</span>
	</DropdownItem>
</Dropdown>
