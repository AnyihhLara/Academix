<script>
	import { Input, Label, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;

	let tableName = 'estudiante',
		defaultClass = 'mt-2',
		student = {
			code: '',
			name: '',
			lastname: '',
			sex: '',
			municipality: '',
			academicSituation: '',
			unenrollmentReason: '',
			academicYear: 0,
			group: 0
		};
	let sexes, years, groups, academicSituations, unenrollmentReasons;

	function createItem() {}
	function updateItem() {}
	function deleteItem() {}
	function resetForm() {
		student = {
			code: '',
			name: '',
			lastname: '',
			sex: '',
			municipality: '',
			academicSituation: '',
			unenrollmentReason: '',
			academicYear: 0,
			group: 0
		};
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="code">
			Código
			<Input
				type="text"
				id="code"
				placeholder="Código del estudiante"
				class={defaultClass}
				bind:value={student.code}
				required
			/>
		</Label>
	</div>
	<div>
		<Label for="name">
			Nombre
			<Input
				type="text"
				id="name"
				placeholder="Nombre del estudiante"
				class={defaultClass}
				bind:value={student.name}
				required
			/>
		</Label>
	</div>

	<div>
		<Label for="lastname">
			Apellidos
			<Input
				type="text"
				id="lastname"
				placeholder="Apellidos del estudiante"
				class={defaultClass}
				bind:value={student.lastname}
				required
			/>
		</Label>
	</div>
	<div>
		<Label
			>Sexo
			<Select class="mt-2" items={sexes} bind:value={student.sex} required />
		</Label>
	</div>
	<div>
		<Label for="municipality">
			Municipio
			<Input
				type="text"
				id="municipality"
				placeholder="Municipio del estudiante"
				class={defaultClass}
				bind:value={student.municipality}
				required
			/>
		</Label>
	</div>
	<div>
		<Label
			>Año
			<Select class={defaultClass} items={years} bind:value={student.year} required />
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
			/>
		</Label>
	</div>
</GenericForm>
<!-- see later inputs to disable (year, unenrollmentReason, etc) -->
