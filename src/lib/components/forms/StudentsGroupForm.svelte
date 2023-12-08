<script>
	import { Label, NumberInput, Select } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'grupo de estudiantes',
		defaultClass = 'mt-2',
		studentsGroup = { year: 0, number: 0 };
	let years;
	function createItem() {}
	function updateItem() {}
	function resetForm() {
		studentsGroup = { year: 0, number: 0 };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {resetForm}>
	<div>
		<Label
			>Año
			<Select class="mt-2" items={years} bind:value={studentsGroup.year} required />
		</Label>
	</div>
	<div>
		<Label for="number"
			>Número
			<NumberInput id="number" class={defaultClass} bind:value={studentsGroup.number} required />
		</Label>
	</div>
</GenericForm>
