<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Input, Label, Select } from 'flowbite-svelte';

	let defaultClass = 'mt-2';
	//test variables
	let evaluationTypes = [
	];
    let students = [
	];
    let subjects = [
	];
	//
	export let evaluation = {
		evaluationType: '',
		student: '',
		subject: '',
        evaluationDate: new Date()
	};
</script>

<div>
	<Label
		>Tipo de Evaluación
		<Select class="mt-2" items={evaluationTypes} bind:value={evaluation.evaluationType} required />
	</Label>
</div>
<div>
	<Label
		>Estudiante
		<Select class="mt-2" items={students} bind:value={evaluation.student} required />
	</Label>
</div>
<div>
	<Label
		>Asignatura
		<Select class="mt-2" items={subjects} bind:value={evaluation.subject} required />
	</Label>
</div>
<div>
	<InputWrapper forLabel="evaluationDate"
		>Fecha
		<Input
			type="date"
			id="evaluationDate"
			class={defaultClass}
			bind:value={evaluation.evaluationDate}
			required
		/>
	</InputWrapper>
</div>
