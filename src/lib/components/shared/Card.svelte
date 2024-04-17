<script>
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	import { t } from '$lib/stores/stores.js';
	import { page } from '$app/stores';

	export let divClass = '',
		cardClass = '';
</script>

<Card class="space-y-1 justify-center {cardClass}">
	<div class={divClass}>
		<slot name="avatar-slot" />
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
			<slot name="title" />
		</h5>
		<slot />
	</div>	
	{#if $page.data.role !== 'Estudiante'}
		<Button class="w-full" on:click>
			{$t('Ver más')}<ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
		</Button>
	{/if}
</Card>
