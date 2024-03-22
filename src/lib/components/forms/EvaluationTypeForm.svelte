<script>
	import { Input, Label, NumberInput } from 'flowbite-svelte';
	import GenericForm from './GenericForm.svelte';
	import evaluationTypeService from '$lib/services/EvaluationTypeService.js';
	import { createEventDispatcher, onMount } from 'svelte';

	export let action;
	export let item = null;
	let tableName = 'tipo de evaluación',
		defaultClass = 'mt-2',
		evaluationType = { name: '', numericalValue: 0 };
	let evaluationTypeServ = evaluationTypeService.getInstance();
	const dispatch = createEventDispatcher();

	onMount(async () => await resetForm());

	async function createItem() {
		item = await evaluationTypeServ.createEvaluationType(
			evaluationType.name,
			evaluationType.numericalValue
		);
		dispatch('created');
	}

	async function updateItem() {
		await evaluationTypeServ.updateEvaluationType(
			item.evaluation_type_id,
			evaluationType.name,
			evaluationType.numericalValue
		);
		dispatch('updated');
	}

	async function deleteItem() {
		await evaluationTypeServ.deleteEvaluationType(item.evaluation_type_id);
		dispatch('deleted');
	}

	async function resetForm() {
		if (item) {
			let {
				evaluation_type_id,
				evaluation_type_name,
				evaluation_numerical_value
			} = await evaluationTypeServ.getEvaluationType(item.evaluation_type_id);
			item.evaluation_type_id = evaluation_type_id;
			item.evaluation_type_name = evaluation_type_name;
			item.evaluation_numerical_value = evaluation_numerical_value;
			evaluationType.name = item.evaluation_type_name;
			evaluationType.numericalValue = item.evaluation_numerical_value;
		} else {
			evaluationType = { name: '', numericalValue: 0 };
		}
	}
</script>

<GenericForm {action} {createItem} {deleteItem} {resetForm} {tableName} {updateItem}>
	<div>
		<Label for='name'
		>Nombre
			<Input
				bind:value={evaluationType.name}
				class={defaultClass}
				id='name'
				placeholder='Nombre del tipo de evaluación'
				required
				type='text'
			/>
		</Label>
	</div>
	<div>
		<Label for='numericalValue'
		>Valor numérico
			<NumberInput
				bind:value={evaluationType.numericalValue}
				class={defaultClass}
				id='numericalValue'
				required
			/>
		</Label>
	</div>
</GenericForm>
