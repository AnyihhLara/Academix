<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import UnenrollmentReasonForm from './UnenrollmentReasonForm.svelte';
	let openModal = false,
		tableName = 'causa de baja';
	function handleUpdate() {}
	export let unenrollmentReason;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate}>
	<UnenrollmentReasonForm {unenrollmentReason} />
</UpdateForm>
