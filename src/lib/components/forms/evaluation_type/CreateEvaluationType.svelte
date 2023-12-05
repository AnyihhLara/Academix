<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import EvaluationTypeForm from './EvaluationTypeForm.svelte';
	let openModal = false,
		tableName = 'tipo de evaluación';
	function handleSubmit() {};
	export let evaluationType;
</script>

<CreateForm {tableName} {openModal} {handleSubmit} >
	<EvaluationTypeForm {evaluationType}/>
</CreateForm>

