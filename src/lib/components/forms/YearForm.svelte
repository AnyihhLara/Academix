<script>
	import { Input, Label, NumberInput } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'año',
		defaultClass = 'mt-2',
		year = { academicYear: 0, schoolYear: '' };
	function createItem() {}
	function updateItem() {}
	function resetForm() {
		year = { academicYear: 0, schoolYear: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {resetForm}>
	<div>
		<Label for="year"
			>Año
			<NumberInput id="year" class={defaultClass} bind:value={year.year} required />
		</Label>
	</div>
	<div>
		<Label for="schoolYear"
			>Curso escolar
			<Input
				type="text"
				id="schoolYear"
				placeholder="Curso escolar del año"
				class={defaultClass}
				bind:value={year.schoolYear}
				required
			/>
		</Label>
	</div>
</GenericForm>
