<script>
    import Card from '$lib/components/shared/Card.svelte';
    import {Avatar, Label} from 'flowbite-svelte';
    import {goto} from '$app/navigation';
    import Table from '$lib/components/shared/Table.svelte';
    import studentService from "$lib/services/StudentService.js";
    import evaluationService from "$lib/services/EvaluationService.js";
    import {onMount} from "svelte";
    import {page} from '$app/stores';

    onMount(() => {
        refreshItems();
    });

    let student = {
            student_id: '',
            student_code: '',
            student_name: '',
            lastname: '',
            sex: '',
            municipality: '',
            user_id: $page.data.user.user_id,
            year: '',
            group_number: '',
            academic_situation: '',
            unenrollment_reason: null
        },
        evaluations = [],
        filters = [],
        isFilterable = false,
        isUpdatable = false,
        isDeletable = false,
        isCreatable = false;
    let tableName = "Evaluaciones del estudiante";
    let studentServ = studentService.getInstance();

    const gotoReports = () => {
        goto('/academix/reports');
    };

    const refreshItems = () => {
        studentServ.getStudentByUser($page.data.user.user_id).then((i) => {
            student = i;

            let evaluationServ = evaluationService.getInstance();
            // TODO: Create evaluations for a student with user
            evaluationServ.getEvaluationsOfStudent(student.student_id).then((j) => {
                evaluations = j;
            })
        })
    };
</script>

<section class="py-2 pb-2 pt-4 grid justify-center w-full">
    <h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
        Perfil de estudiante
    </h1>
    <Card
            cardClass="max-w-full"
            divBtnClass="flex justify-between mt-1"
            divClass="flex gap-5 items-start justify-center"
            on:click={gotoReports}
    >
        <svelte:fragment slot="avatar-slot">
            <Avatar size="xl"/>
        </svelte:fragment>
        <div class="flex gap-5">
            <div class="grid gap-5 mb-4">
                <Label>Código:<span class="mx-2">{student.student_code}</span></Label>
                <Label>Nombre:<span class="mx-2">{student.student_name}</span></Label>
                <Label>Apellidos:<span class="mx-2">{student.lastname}</span></Label>
                <Label>Año académico:<span class="mx-2">{student.year}</span></Label>
            </div>
            <div class="grid gap-5 mb-4">
                <Label>Grupo:<span class="mx-2">{student.group_number}</span></Label>
                <Label>Sexo:<span class="mx-2">{student.sex}</span></Label>
                <Label>Municipio:<span class="mx-2">{student.municipality}</span></Label>
                <Label>Situación académica:<span class="mx-2">{student.academic_situation}</span></Label>
            </div>
        </div>
        <img alt="reportes" class="w-52 h-32" src="/reports.jpg"/>
        <span slot="div-btn">
			{#if student.unenrollment_reason}
			<Label class="ml-[184px]"
            >Causa de baja:<span class="mx-2">{student.unenrollment_reason}</span></Label>
            {/if}
		</span>
        <span slot="btn-text">Reportes</span>
    </Card>
    <Table {filters} {isCreatable} {isDeletable} {isFilterable} {isUpdatable}
           items={evaluations} {refreshItems} {tableName}/>
</section>
