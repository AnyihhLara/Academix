<script>
	import { Input, Label } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'rol',
		defaultClass = 'mt-2',
		role = { name: '' };
	function createItem() {}
	function updateItem() {}
	function deleteItem() {}
	function resetForm() {
		role = { name: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {deleteItem} {resetForm}>
	<div>
		<Label for="name"
			>Nombre
			<Input
				type="text"
				id="name"
				placeholder="Nombre del rol"
				class={defaultClass}
				bind:value={role.name}
				required
			/>
		</Label>
	</div>
</GenericForm>
