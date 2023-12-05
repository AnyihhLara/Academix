<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import StudentsGroupForm from './StudentsGroupForm.svelte';
	let openModal = false,
		tableName = 'grupo de estudiantes';
	function handleSubmit() {}
	export let studentsGroup;
</script>

<CreateForm {tableName} {openModal} {handleSubmit}>
	<StudentsGroupForm {studentsGroup} />
</CreateForm>