<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Input, Label, NumberInput, Select } from 'flowbite-svelte';

	let defaultClass = 'mt-2';
	//test variables
	let years = [
		{ value: '1', name: '1er' },
		{ value: '2', name: '2do' },
		{ value: '3', name: '3ero' },
		{ value: '4', name: '4to' }
	];
	//
	export let subject = {
		name: '',
		plannedHours: 0,
		year: 0
	};
</script>

<div>
	<InputWrapper forLabel="name"
		>Nombre
		<Input
			type="text"
			id="name"
			placeholder="Nombre de la asignatura"
			class={defaultClass}
			bind:value={subject.name}
			required
		/>
	</InputWrapper>
</div>
<div>
	<InputWrapper forLabel="plannedHours"
		>Horas planificadas
		<NumberInput
			id="plannedHours"
			class={defaultClass}
			bind:value={subject.plannedHours}
			required
		/>
	</InputWrapper>
</div>

<div>
	<Label
		>Año
		<Select class="mt-2" items={years} bind:value={subject.year} required />
	</Label>
</div>
