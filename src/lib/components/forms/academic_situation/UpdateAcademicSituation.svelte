<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import AcademicSituationForm from './AcademicSituationForm.svelte';
    let openModal = false,
		tableName = 'situación académica';
	function handleUpdate() {}
	export let academicSituation;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate} >
	<AcademicSituationForm {academicSituation} />
</UpdateForm>
