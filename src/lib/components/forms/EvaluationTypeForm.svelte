<script>
	import { Input, Label, NumberInput } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'tipo de evaluación',
		defaultClass = 'mt-2',
		evaluationType = { name: '', numericalValue: 0 };
	function createItem() {}
	function updateItem() {}
	function deleteItem() {}
	function resetForm() {
		evaluationType = { name: '', numericalValue: 0 };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="name"
			>Nombre
			<Input
				type="text"
				id="name"
				placeholder="Nombre del tipo de evaluación"
				class={defaultClass}
				bind:value={evaluationType.name}
				required
			/>
		</Label>
	</div>
	<div>
		<Label for="numericalValue"
			>Valor numérico
			<NumberInput
				id="numericalValue"
				class={defaultClass}
				bind:value={evaluationType.numericalValue}
				required
			/>
		</Label>
	</div>
</GenericForm>
