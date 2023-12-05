<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import StudentsGroupForm from './StudentsGroupForm.svelte';
	let openModal = false,
		tableName = 'grupo de estudiantes';
	function handleUpdate() {}
	export let studentsGroup;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate}>
	<StudentsGroupForm {studentsGroup} />
</UpdateForm>