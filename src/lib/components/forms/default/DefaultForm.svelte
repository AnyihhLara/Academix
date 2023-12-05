<script>
	import { Section } from 'flowbite-svelte-blocks';
	import { Button, Modal } from 'flowbite-svelte';
	export let tittle,
		nameModalBtn,
		openModal = false;
</script>

<Section classSection="h-96">
	<div class="flex justify-center m-5">
		<Button on:click={() => (openModal = true)}>{nameModalBtn}</Button>
	</div>
	<Modal title={tittle} bind:open={openModal} autoclose class="min-w-full">
		<form on:submit|preventDefault>
			<div class="grid gap-4 mb-4">
				<slot />
			</div>
			<div class="flex justify-center items-center w-full">
				<slot name="btn" />
			</div>
		</form>
	</Modal>
</Section>
