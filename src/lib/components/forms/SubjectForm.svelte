<script>
	import { Input, Label, NumberInput, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'asignatura',
		defaultClass = 'mt-2',
		subject = { name: '', plannedHours: 0, year: 0 };
	let years;
	function createItem() {}
	function updateItem() {}
	function deleteItem() {}
	function resetForm() {
		subject = { name: '', plannedHours: 0, year: 0 };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="name"
			>Nombre
			<Input
				type="text"
				id="name"
				placeholder="Nombre de la asignatura"
				class={defaultClass}
				bind:value={subject.name}
				required
			/>
		</Label>
	</div>
	<div>
		<Label for="plannedHours"
			>Horas planificadas
			<NumberInput
				id="plannedHours"
				class={defaultClass}
				bind:value={subject.plannedHours}
				required
			/>
		</Label>
	</div>

	<div>
		<Label
			>Año
			<Select class="mt-2" items={years} bind:value={subject.year} required />
		</Label>
	</div>
</GenericForm>
