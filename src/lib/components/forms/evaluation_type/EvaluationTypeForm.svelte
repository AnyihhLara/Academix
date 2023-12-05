<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Input, NumberInput } from 'flowbite-svelte';

	let defaultClass = 'mt-2';

	export let evaluationType = {
		name: '',
		numericalValue: 0,
	};
</script>

<div>
	<InputWrapper forLabel="name"
		>Nombre
		<Input
			type="text"
			id="name"
			placeholder="Nombre de la evaluación"
			class={defaultClass}
			bind:value={evaluationType.name}
			required
		/>
	</InputWrapper>
</div>
<div>
	<InputWrapper forLabel="numericalValue"
		>Horas planificadas
		<NumberInput
			id="numericalValue"
			placeholder="Valor numérico de la evaluación"
			class={defaultClass}
			bind:value={evaluationType.numericalValue}
			required
		/>
	</InputWrapper>
</div>
