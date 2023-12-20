<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {onMount} from 'svelte';
    import studentsGroupService from "$lib/services/StudentsGroupService.js";
    import { currentSchoolYear } from '$lib/stores/stores.js';
    import yearService from '$lib/services/YearService.js';
    
    onMount(async() => {
        let yearServ = yearService.getInstance();
        years = await yearServ.getYears();
        years = years.filter(({ school_year }) => school_year === $currentSchoolYear);
        years = years.map(({ year }) => year);
        filters.find((filter) => filter.key === 'year').options = years;
        refreshItems();
    });
    let studentsGroups = [],
        filters = [{name: 'Años', key: 'year', options: [], selectedOptions: []}],
        isFilterable = true,
        years;
    let tableName = "Grupos de estudiantes";
    let studentsGroupServ = studentsGroupService.getInstance();

    const refreshItems = () => {
        studentsGroupServ.getStudentsGroups().then((i) => {
            studentsGroups = i;
        })
    }
</script>

<Table {filters} {isFilterable} items={studentsGroups} {refreshItems} {tableName}/>
