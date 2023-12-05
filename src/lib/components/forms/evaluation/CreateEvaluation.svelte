<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import EvaluationForm from './EvaluationForm.svelte';
	let openModal = false,
		tableName = 'evaluación';
	function handleSubmit() {}
	export let evaluation;
</script>

<CreateForm {tableName} {openModal} {handleSubmit}>
	<EvaluationForm {evaluation} />
</CreateForm>
