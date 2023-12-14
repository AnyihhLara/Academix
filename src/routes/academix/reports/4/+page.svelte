<script>
	import {Select} from 'flowbite-svelte';
	import Table from '$lib/components/shared/Table.svelte';
	import reportService from "$lib/services/ReportService.js";
	import {onMount} from "svelte";

	onMount(() => {
        refreshItems();
    })

    let tableName = 'Reporte 4',
        options = [
            {value: 'Acumulado', name: 'Acumulado'},
            {value: 'Anual', name: 'Anual'}
        ],
        selectedOption = 'Acumulado';
    let service = reportService.getInstance();
    let dataByGroup = [];
    const refreshItems = () => {
        service.report4(selectedOption).then((i) => {
            dataByGroup = i;
        });
    }
</script>

<section class="px-2 pt-6 pb-8">
    <div class="flex items-center justify-between mx-6 gap-4">
        <h1 class="text-center text-2xl font-semibold text-primary-950 dark:text-primary-100">
            Listado de los promedios finales obtenidos por los estudiantes de cada grupo
        </h1>
        <div class="flex justify-center mx-5">
            <Select
                    bind:value={selectedOption}
                    class="w-96 h-10 mt-1"
                    items={options}
                    on:change={refreshItems}
                    placeholder="Seleccione una opción:"
            />
        </div>
    </div>
    {#each dataByGroup as periodData}
        <section class="mt-6 mx-3" key={selectedOption}>
            <h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
                {selectedOption} - Año: {periodData.year}
            </h2>
            {#if selectedOption === 'Acumulado'}
                <h3 class="font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg">
                    Período: 1
                    {#if periodData.year > 1}
                        - {periodData.year}
                    {/if}
                    año
                </h3>
            {/if}
            {#each periodData.groups as groupData}
                <div class="group">
                    <h4 class="font-bold block mb-2 ml-6 text-secondary-800 dark:text-secondary-100 text-lg">
                        Grupo {groupData.groupNumber}
                    </h4>
                    <Table
                            {tableName}
                            items={groupData.students}
                            isCreatable={false}
                            isUpdatable={false}
                            isDeletable={false}
                            isNamed={false}
                            {refreshItems}
                    />
                </div>
            {/each}
        </section>
    {/each}
</section>
