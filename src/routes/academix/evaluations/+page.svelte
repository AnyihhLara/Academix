<script>
	import Table from '$lib/components/shared/Table.svelte';
	import { onMount } from 'svelte';
	import evaluationService from '$lib/services/EvaluationService.js';
	import evaluationTypeService from '$lib/services/EvaluationTypeService.js';
	import subjectService from '$lib/services/SubjectService.js';

	onMount(async () => {
		let subjectServ = subjectService.getInstance();
		let evaluationTypeServ = evaluationTypeService.getInstance();
		subjects = await subjectServ.getSubjects();
		subjects = subjects.map(({ subject_name }) => subject_name);
		filters.find((filter) => filter.key === 'subject_name').options = subjects;
		evaluationTypes = await evaluationTypeServ.getEvaluationTypes();
		evaluationTypes = evaluationTypes.map(
			({ evaluation_numerical_value }) => evaluation_numerical_value
		);
		filters.find((filter) => filter.key === 'evaluation_numerical_value').options = evaluationTypes;
		refreshItems();
	});
	let evaluations = [],
		filters = [
			{ name: 'Asignatura', key: 'subject_name', options: [], selectedOptions: [] },
			{ name: 'Nota', key: 'evaluation_numerical_value', options: [], selectedOptions: [] }
		],
		evaluationTypes,
		subjects,
		isFilterable = true;
	let tableName = 'Evaluaciones';
	let evaluationServ = evaluationService.getInstance();

	const refreshItems = () => {
		evaluationServ.getEvaluations().then((i) => {
			evaluations = i;
		});
	};
</script>

<Table {filters} {isFilterable} items={evaluations} {refreshItems} {tableName} />
