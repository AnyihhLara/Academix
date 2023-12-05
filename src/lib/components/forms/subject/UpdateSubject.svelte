<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import SubjectForm from './SubjectForm.svelte';
    let openModal = false,
		tableName = 'asignatura';
	function handleUpdate() {}
	export let subject;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate} >
	<SubjectForm {subject} />
</UpdateForm>