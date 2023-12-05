<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import SubjectForm from './SubjectForm.svelte';
	let openModal = false,
		tableName = 'asignatura';
	function handleSubmit() {};
	export let subject;
</script>

<CreateForm {tableName} {openModal} {handleSubmit} >
	<SubjectForm {subject}/>
</CreateForm>