<script>
	import { Input, Label } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';

	export let action;
	let tableName = 'causa de baja',
		defaultClass = 'mt-2',
		unenrollmentReason = { name: '' };
	function createItem() {}
	function updateItem() {}
	function resetForm() {
		unenrollmentReason = { name: '' };
	}
</script>

<GenericForm {action} {tableName} {createItem} {updateItem} {resetForm}>
	<div>
		<Label for="name"
			>Nombre
			<Input
				type="text"
				id="name"
				placeholder="Nombre de la causa de baja"
				class={defaultClass}
				bind:value={unenrollmentReason.name}
				required
			/>
		</Label>
	</div>
</GenericForm>
