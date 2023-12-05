<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import StudentForm from './StudentForm.svelte';
	let openModal = false,
		tableName = 'estudiante';
	function handleUpdate() {}
	export let student;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate} disabledYear={true} disabledUnerollmentReason={false} >
	<StudentForm {student} />
</UpdateForm>
