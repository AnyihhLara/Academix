<script>
    import Table from '$lib/components/shared/Table.svelte';
    import {browser} from '$app/environment';
    import {page} from '$app/stores';
    import {goto} from '$app/navigation';
    import authService from '$lib/services/AuthService.js';
    import {view, loggedUser} from '$lib/stores/stores.js';
    import {onMount} from 'svelte';
    import studentService from "$lib/services/StudentService.js";

    onMount(() => {
        let authServ = authService.getInstance();
        let routes = [];
        if (browser) {
            routes = authServ.getAuthorizedRoutes();
            if (!routes.includes($page.url.pathname)) {
                $view = routes[0];
                goto($view);
            }
        }
        refreshItems();
    });
    let students = [
            // {
            // 	code: '03111466770',
            // 	name: 'Anyeleni',
            // 	lastname: 'Lara Santana',
            // 	sex: 'F',
            // 	municipality: 'Plaza',
            // 	academicSituation: 'Promovido',
            // 	unenrollmentReason: '',
            // 	academicYear: 2,
            // 	group: 2
            // },
            // {
            // 	code: '03111466770',
            // 	name: 'B',
            // 	lastname: 'Lara Santana',
            // 	sex: 'F',
            // 	municipality: 'Plaza',
            // 	academicSituation: 'Promovido',
            // 	unenrollmentReason: '',
            // 	academicYear: 1,
            // 	group: 3
            // },
            // {
            // 	code: '03111466770',
            // 	name: 'F',
            // 	lastname: 'Lara Santana',
            // 	sex: 'M',
            // 	municipality: 'Plaza',
            // 	academicSituation: 'Promovido',
            // 	unenrollmentReason: '',
            // 	academicYear: 2,
            // 	group: 1
            // },
            // {
            // 	code: '03111466770',
            // 	name: 'C',
            // 	lastname: 'Lara Santana',
            // 	sex: 'M',
            // 	municipality: 'Plaza',
            // 	academicSituation: 'Promovido',
            // 	unenrollmentReason: '',
            // 	academicYear: 1,
            // 	group: 2
            // },
            // {
            // 	code: '03111466770',
            // 	name: 'D',
            // 	lastname: 'Lara Santana',
            // 	sex: 'F',
            // 	municipality: 'Plaza',
            // 	academicSituation: 'Promovido',
            // 	unenrollmentReason: '',
            // 	academicYear: 4,
            // 	group: 1
            // },
            // {
            // 	code: '03111466770',
            // 	name: 'I',
            // 	lastname: 'Lara Santana',
            // 	sex: 'M',
            // 	municipality: 'Plaza',
            // 	academicSituation: 'Promovido',
            // 	unenrollmentReason: '',
            // 	academicYear: 1,
            // 	group: 2
            // }
        ],
        filters = [
            {name: 'Situaciones Académicas', key: 'academicSituation', options: [], selectedOptions: []},
            {name: 'Años', key: 'academicYear', options: [], selectedOptions: []},
            {name: 'Grupos', key: 'group', options: [], selectedOptions: []}
        ],
        isFilterable = true,
        isCreatable = false,
        isUpdatable = false,
        isDeletable = false;

    let tableName = "Estudiantes";
    let studentServ = studentService.getInstance();

    const refreshItems = () => {
        studentServ.getStudents().then((i) => {
            students = i;
            console.log(students)
        })
    }
</script>

{#if $loggedUser.role_name === 'Secretario'}
    <Table {tableName} items={students} {filters} {isFilterable} {isDeletable} {refreshItems}/>
{:else}
    <Table
            {tableName}
            items={students}
            {filters}
            {isFilterable}
            {isCreatable}
            {isUpdatable}
            {isDeletable}
            {refreshItems}
    />
{/if}
