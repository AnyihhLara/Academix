<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import AcademicSituationForm from './AcademicSituationForm.svelte';
	let openModal = false,
		tableName = 'situación académica';
	function handleSubmit() {};
	export let academicSituation;
</script>

<CreateForm {tableName} {openModal} {handleSubmit} >
	<AcademicSituationForm {academicSituation}/>
</CreateForm>