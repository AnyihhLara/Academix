<script>
	import { Button, Modal } from 'flowbite-svelte';
	export let tittle,
		nameModalBtn,
		openModal = false;
</script>

<Button size="sm" on:click={() => (openModal = true)} class="gap-2"><slot name="icon-btn"/>{nameModalBtn}</Button>
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
