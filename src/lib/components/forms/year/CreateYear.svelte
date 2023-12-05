<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import YearForm from './YearForm.svelte';
	let openModal = false,
		tableName = 'año';
	function handleSubmit() {};
	export let year;
</script>

<CreateForm {tableName} {openModal} {handleSubmit} >
	<YearForm {year}/>
</CreateForm>
