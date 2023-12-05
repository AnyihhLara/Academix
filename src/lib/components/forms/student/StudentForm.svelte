<script>
	import InputWrapper from '$lib/components/shared/InputWrapper.svelte';
	import { Input, Label, Select } from 'flowbite-svelte';
	
	export let disabledYear = false, disabledUnenrollmentReason = true;
	let defaultClass = 'mt-2';
	let sex = [
		{ value: 'F', name: 'Femenino' },
		{ value: 'M', name: 'Masculino' }
	];
	//test variables
	let academicSituations = [
	];
	let years = [
	];
	let groups = [
	];
	let unenrollmentReasons = [
	];
	//
	export let student = {
		code: '',
		name: '',
		lastname: '',
		sex: '',
		municipality: '',
		academicSituation: '',
		unenrollmentReason:'',
		year: '',
		group: ''
	};
</script>

<div>
	<InputWrapper forLabel="code"
		>Código
		<Input
			type="text"
			id="code"
			placeholder="Código del estudiante"
			class={defaultClass}
			bind:value={student.code}
			required
		/>
	</InputWrapper>
</div>
<div>
	<InputWrapper forLabel="name"
		>Nombre
		<Input
			type="text"
			id="code"
			placeholder="Nombre del estudiante"
			class={defaultClass}
			bind:value={student.name}
			required
		/>
	</InputWrapper>
</div>
<div>
	<InputWrapper forLabel="lastname"
		>Apellidos
		<Input
			type="text"
			id="code"
			placeholder="Apellidos del estudiante"
			class={defaultClass}
			bind:value={student.lastname}
			required
		/>
	</InputWrapper>
</div>
<div>
	<Label
		>Sexo
		<Select class="mt-2" items={sex} bind:value={student.sex} required />
	</Label>
</div>
<div>
	<InputWrapper forLabel="municipality"
		>Municipio
		<Input
			type="text"
			id="municipality"
			placeholder="Municipio del estudiante"
			class={defaultClass}
			bind:value={student.municipality}
			required
		/>
	</InputWrapper>
</div>
<div>
	<Label
		>Año
		<Select class={defaultClass} items={years} bind:value={student.year} required disabled={disabledYear} />
	</Label>
</div>
<div>
	<Label
		>Grupo
		<Select class={defaultClass} items={groups} bind:value={student.group} required />
	</Label>
</div>
<div>
	<Label
		>Situación Académica
		<Select
			class={defaultClass}
			items={academicSituations}
			bind:value={student.academicSituation}
			required
		/>
	</Label>
</div>
<div>
	<Label
		>Causa de Baja
		<Select
			class={defaultClass}
			items={unenrollmentReasons}
			bind:value={student.unenrollmentReason}
			required
			disabled={disabledUnenrollmentReason}
		/>
	</Label>
</div>
