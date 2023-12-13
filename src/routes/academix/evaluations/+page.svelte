<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {onMount} from 'svelte';
    import evaluationService from "$lib/services/EvaluationService.js";

    onMount(() => {
        refreshItems();
    });
    let evaluations = [],
        filters = [
            {name: 'Asignaturas', key: 'subject', options: [], selectedOptions: []},
            {name: 'Tipo de evaluación', key: 'evaluationType', options: [], selectedOptions: []}
        ],
        isFilterable = true;
    let tableName = "Evaluaciones";
    let evaluationServ = evaluationService.getInstance();

    const refreshItems = () => {
        evaluationServ.getEvaluations().then((i) => {
            evaluations = i;
        })
    }
</script>

<Table {filters} {isFilterable} items={evaluations} {refreshItems} {tableName}/>
