<script>
	import UpdateForm from '../default/UpdateForm.svelte';
	import YearForm from './YearForm.svelte';
    let openModal = false,
		tableName = 'año';
	function handleUpdate() {}
	export let year;
</script>

<UpdateForm {tableName} {openModal} {handleUpdate} >
	<YearForm {year} />
</UpdateForm>