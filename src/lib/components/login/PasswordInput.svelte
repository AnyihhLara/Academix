<script>
	import { Input } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	let show = false;
</script>

<InputWrapper forLabel="show-password" classLabel="space-y-2">
	Contraseña
	<Input id="show-password" type={show ? 'text' : 'password'} placeholder="tu contraseña aquí" size="lg">
		<button slot="left" on:click={() => (show = !show)} class="pointer-events-auto">
			{#if show}
				<EyeOutline class="w-6 h-6" />
			{:else}
				<EyeSlashOutline class="w-6 h-6" />
			{/if}
		</button>
	</Input>
</InputWrapper>
