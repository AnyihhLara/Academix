<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Input, NumberInput } from 'flowbite-svelte';

	let defaultClass = 'mt-2';

	export let year = {
		year: 0,
		schoolYear: ''
	};
</script>

<div>
	<InputWrapper forLabel="year"
		>Año
		<NumberInput
			id="year"
			class={defaultClass}
			bind:value={year.year}
			required
		/>
	</InputWrapper>
</div>
<div>
	<InputWrapper forLabel="schoolYear"
		>Curso escolar
		<Input
			type="text"
			id="schoolYear"
			placeholder="Curso escolar del año"
			class={defaultClass}
			bind:value={year.schoolYear}
			required
		/>
	</InputWrapper>
</div>

