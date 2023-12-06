<script>
	import {
		Avatar,
		Dropdown,
		DropdownHeader,
		DropdownItem,
		Navbar,
		NavBrand,
		NavHamburger
	} from 'flowbite-svelte';
	import { BuildingSolid, SunSolid, MoonSolid } from 'flowbite-svelte-icons';
	import { DarkMode } from 'flowbite-svelte';
</script>

<Navbar class="shadow-xl">
	<NavBrand href="/" class="ml-8">
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
	</div>
</Navbar>
<Dropdown placement="bottom" triggeredBy="#avatar-menu">
	<DropdownHeader>
		<span class="block text-sm"> Nombre Apellidos </span>
		<span class="block truncate text-sm font-medium"> user </span>
	</DropdownHeader>
	<DropdownItem>Cerrar sesión</DropdownItem>
</Dropdown>
