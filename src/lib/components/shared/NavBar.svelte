<script>
    import { Navbar, NavBrand } from 'flowbite-svelte';
    import { BuildingSolid, SunSolid, MoonSolid } from 'flowbite-svelte-icons';
    import { DarkMode } from 'flowbite-svelte';
</script>

<Navbar class="shadow-xl">
    <NavBrand href="/" class="ml-8">
        <BuildingSolid class="mr-3 h-6 sm:h-9" />
        <span class="self-center whitespace-nowrap text-xl font-bold dark:text-white"
        >ACADEMIX</span
        >
    </NavBrand>
    <DarkMode class="text-lg mr-8">
        <svelte:fragment slot="lightIcon">
            <SunSolid />
        </svelte:fragment>
        <svelte:fragment slot="darkIcon">
            <MoonSolid />
        </svelte:fragment>
    </DarkMode>
</Navbar>
