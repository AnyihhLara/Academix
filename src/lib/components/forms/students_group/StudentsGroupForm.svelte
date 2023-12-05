<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Label, NumberInput, Select } from 'flowbite-svelte';

	let defaultClass = 'mt-2';
	//test variables
	let years = [
	];
	//
	export let studentsGroup = {
		year: 0,
		number: 0
	};
</script>

<div>
	<Label
		>Año
		<Select class="mt-2" items={years} bind:value={studentsGroup.year} required />
	</Label>
</div>
<div>
	<InputWrapper forLabel="number"
		>Número
		<NumberInput
			id="number"
			class={defaultClass}
			bind:value={studentsGroup.number}
			required
		/>
	</InputWrapper>
</div>

