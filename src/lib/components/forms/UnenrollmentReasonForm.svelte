<script>
    import { Input, Label } from 'flowbite-svelte';
    import GenericForm from './GenericForm.svelte';
    import unenrollmentReasonService from '$lib/services/UnenrollmentReasonService.js';
    import { createEventDispatcher } from 'svelte';

    export let action;
	export let item = null;
	let tableName = 'causa de baja',
		defaultClass = 'mt-2',
		unenrollmentReason = { name: '' };
	let unenrollmentReasonServ = unenrollmentReasonService.getInstance();
	const dispatch = createEventDispatcher();

	async function createItem() {
		await unenrollmentReasonServ.createUnenrollmentReason(unenrollmentReason.name);
		dispatch('created');
	}

	async function updateItem() {
		await unenrollmentReasonServ.updateUnenrollmentReason(
			item.unenrollment_reason_id,
			unenrollmentReason.name
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await unenrollmentReasonServ.deleteUnenrollmentReason(item.unenrollment_reason_id);
		dispatch('deleted');
	}

	function resetForm() {
		unenrollmentReason = { name: '' };
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for='name'
		>Nombre
			<Input
				bind:value={unenrollmentReason.name}
				class={defaultClass}
				id='name'
				placeholder='Nombre de la causa de baja'
				required
				type='text'
			/>
		</Label>
	</div>
</GenericForm>
