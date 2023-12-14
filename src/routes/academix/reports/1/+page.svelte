<script>
    import Table from '$lib/components/shared/Table.svelte';
    import reportService from "$lib/services/ReportService.js";
    import {onMount} from "svelte";

    onMount(() => {
        refreshItems();
    })

    let tableName = 'Reporte 1';
    let service = reportService.getInstance();

    let dataBySchoolYear = [
        {
            schoolYear: '2022-2023',
            years: [
                {
                    year: 1,
                    studentsGroups: [
                        {
                            studentsGroup: 1,
                            students: []
                        },
                        {
                            studentsGroup: 2,
                            students: []
                        },
                        {
                            studentsGroup: 3,
                            students: []
                        }
                    ]
                },
                {
                    year: 2,
                    studentsGroups: [
                        {
                            studentsGroup: 1,
                            students: []
                        },
                        {
                            studentsGroup: 2,
                            students: []
                        }
                    ]
                }
            ]
        },
        {
            schoolYear: '2023-2024',
            years: []
        }
    ];

    const refreshItems = () => {
        service.report1().then((i) => {
            dataBySchoolYear = i;
        });
    }
</script>

<section class="pb-10">
    <h1 class="text-center text-2xl mb-4 pt-3 font-semibold text-primary-950 dark:text-primary-100">
        Listado de los estudiantes por grupo
    </h1>
    {#if dataBySchoolYear}
        {#each dataBySchoolYear as schoolYearData}
            <section class="mt-6 mx-3" key={schoolYearData.schoolYear}>
                <h2 class="font-bold block mb-3 ml-3 text-secondary-950 dark:text-secondary-100 text-xl">
                    Curso: {schoolYearData.schoolYear}
                </h2>
                {#if schoolYearData.years}
                    {#each schoolYearData.years as yearData}
                        <section class="mt-4" key={`${schoolYearData.schoolYear}-${yearData.year}`}>
                            <h3
                                    class="font-bold block mb-2 ml-4 text-secondary-850 dark:text-secondary-100 text-lg"
                            >
                                Año: {yearData.year}
                            </h3>
                            {#if yearData.studentsGroups}
                                {#each yearData.studentsGroups as studentsGroupData}
                                    <section
                                            class="mt-2"
                                            key={`${schoolYearData.schoolYear}-${yearData.year}-${studentsGroupData.studentsGroup}`}
                                    >
                                        <h4
                                                class="font-bold block mb-1 ml-6 text-secondary-800 dark:text-secondary-100 text-md"
                                        >
                                            Grupo: {studentsGroupData.studentsGroup}
                                        </h4>
                                        <Table
                                                {tableName}
                                                items={studentsGroupData.students}
                                                isCreatable={false}
                                                isUpdatable={false}
                                                isDeletable={false}
                                                isNamed={false}
                                                {refreshItems}
                                        />
                                    </section>
                                {/each}
                            {/if}
                        </section>
                    {/each}
                {/if}
            </section>
        {/each}
    {/if}
</section>
