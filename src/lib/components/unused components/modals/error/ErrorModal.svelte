<script>
	import { Button, Modal } from 'flowbite-svelte';

	export let open = false;
</script>

<Modal title="Error" bind:open color="red" autoclose on:close>
	<div class="text-base leading-relaxed">
		<slot />
	</div>
	<svelte:fragment slot="footer">
		<Button on:click color="red">OK</Button>
	</svelte:fragment>
</Modal>
