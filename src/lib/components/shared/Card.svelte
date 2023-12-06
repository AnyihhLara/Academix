<script>
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
</script>

<Card class="min-w-[400px]">
	<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
		<slot name="tittle" />
	</h5>
    <slot/>
	<Button class="w-fit" on:click>
		Ver más <ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
	</Button>
</Card>
