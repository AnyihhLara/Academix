<script>
	import { Input, Label } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'situación académica',
		defaultClass = 'mt-2',
		academicSituation = { name: '' };
	function createItem() {}
	function updateItem() {}
	function deleteItem() {}
	function resetForm() {
		academicSituation = { name: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="name"
			>Nombre
			<Input
				type="text"
				id="name"
				placeholder="Nombre de la situación académica"
				class={defaultClass}
				bind:value={academicSituation.name}
				required
			/>
		</Label>
	</div>
</GenericForm>
