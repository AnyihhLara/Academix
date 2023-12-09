<script>
	import { Card, Button } from 'flowbite-svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';
	export let divClass, cardClass, divBtnClass;
</script>

<Card class="min-w-[400px] {cardClass}">
	<div class={divClass}>
		<slot name="avatar-slot" />
		<h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
			<slot name="tittle" />
		</h5>
		<slot />
	</div>
	<div class={divBtnClass}>
		<slot name="div-btn" />
		<Button class="w-fit" on:click>
			<slot name="btn-text" /><ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
		</Button>
	</div>
</Card>
