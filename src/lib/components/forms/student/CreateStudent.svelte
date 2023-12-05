<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import StudentForm from './StudentForm.svelte';
	let openModal = false,
		tableName = 'estudiante';
	function handleSubmit() {}
	export let student;
</script>

<CreateForm {tableName} {openModal} {handleSubmit}>
	<StudentForm {student}/>
</CreateForm>
