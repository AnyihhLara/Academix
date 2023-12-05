<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import EvaluationForm from './EvaluationForm.svelte';
    let openModal = false,
		tableName = 'evaluación';
	function handleUpdate() {}
	export let evaluation;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate} >
	<EvaluationForm {evaluation} />
</UpdateForm>