<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import EvaluationTypeForm from './EvaluationTypeForm.svelte';
	let openModal = false,
		tableName = 'tipo de evaluación';
	function handleUpdate() {}
	export let evaluationType;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate}>
	<EvaluationTypeForm {evaluationType} />
</UpdateForm>
