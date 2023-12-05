<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import UnenrollmentReasonForm from './UnenrollmentReasonForm.svelte';
	let openModal = false,
		tableName = 'causa de baja';
	function handleSubmit() {};
	export let unenrollmentReason;
</script>

<CreateForm {tableName} {openModal} {handleSubmit} >
	<UnenrollmentReasonForm {unenrollmentReason}/>
</CreateForm>