<script>
	import { Input, Label } from 'flowbite-svelte';
	import { EyeOutline, EyeSlashOutline } from 'flowbite-svelte-icons';

	let show = false;
	export let password;
</script>

<Label for="show-password" class="space-y-2">
	Contraseña
	<Input
		id="show-password"
		type={show ? 'text' : 'password'}
		placeholder="••••••••"
		size="lg"
		required
		bind:value={password}
	>
		<button slot="left" on:click={() => (show = !show)} class="pointer-events-auto">
			{#if show}
				<EyeOutline class="w-6 h-6" />
			{:else}
				<EyeSlashOutline class="w-6 h-6" />
			{/if}
		</button>
	</Input>
</Label>
