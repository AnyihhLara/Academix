<script>
	import {
		Avatar,
		DarkMode,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		Navbar,
		NavBrand
	} from 'flowbite-svelte';
	import { BuildingSolid, MoonSolid, SunSolid } from 'flowbite-svelte-icons';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { loggedIn, view, t } from '$lib/stores/stores.js';
	import LanguageSelector from './LanguageSelector.svelte';

	async function handleLogout() {
		try {
			await fetch('/api/services/auth/logout', { method: 'DELETE' });
		} catch (e) {
			console.log(e);
		} finally {
			$view = '/';
			$loggedIn = false;
			await goto($view, { invalidateAll: true });
		}
	}
</script>

<Navbar class="shadow-xl">
	<NavBrand class="ml-8" href="/">
		<BuildingSolid class="mr-3 h-6 sm:h-9" />
		<span class="self-center whitespace-nowrap text-xl font-bold dark:text-white">ACADEMIX</span>
	</NavBrand>
	<div class="flex items-center gap-4">
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
</Navbar>
<Dropdown placement="bottom" triggeredBy="#avatar-menu">
	<DropdownHeader>
		<span class="block text-sm"> {$t('Usuario')} </span>
		<span class="block truncate text-sm font-medium"> {$page.data.user} </span>
	</DropdownHeader>
	<DropdownItem>
		<button on:click={handleLogout} class="text-red-600 text-sm">{$t('Cerrar sesión')}</button>
	</DropdownItem>
</Dropdown>
