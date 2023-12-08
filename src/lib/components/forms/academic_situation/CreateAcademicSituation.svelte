<script>
	import CreateForm from '$lib/components/forms/default/CreateForm.svelte';
	import AcademicSituationForm from './AcademicSituationForm.svelte';
	import AcademicSituationService from '$lib/services/AcademicSituationService.js';
	let openModal = false,
		tableName = 'situación académica';
	function handleSubmit() {
		let service = AcademicSituationService.getInstance();
		service.createAcademicSituation(object.name);
	}
	export let object;
</script>

<CreateForm {tableName} {openModal} on:submit={handleSubmit}>
	<AcademicSituationForm academicSituation={object} />
</CreateForm>
