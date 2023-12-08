<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Input } from 'flowbite-svelte';

	let defaultClass = 'mt-2';
	//
	export let academicSituation = {
		name: '',
	};
</script>

<div>
	<InputWrapper forLabel="name" classLabel="" colorLabel=""
		>Nombre
		<Input
			type="text"
			id="name"
			placeholder="Nombre de la situación académica"
			class={defaultClass}
			bind:value={academicSituation.name}
			required
		/>
	</InputWrapper>
</div>