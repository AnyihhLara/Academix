<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Input } from 'flowbite-svelte';

	let defaultClass = 'mt-2';

	export let unenrollmentReason = {
		name: ''
	};
</script>

<div>
	<InputWrapper forLabel="name"
		>Nombre
		<Input
			type="text"
			id="name"
			placeholder="Nombre de la causa de baja"
			class={defaultClass}
			bind:value={unenrollmentReason.name}
			required
		/>
	</InputWrapper>
</div>
