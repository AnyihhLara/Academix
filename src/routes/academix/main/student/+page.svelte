<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { Avatar, Button, Label } from 'flowbite-svelte';
	import { goto } from '$app/navigation';
	import Table from '$lib/components/shared/Table.svelte';
	import studentService from '$lib/services/StudentService.js';
	import evaluationService from '$lib/services/EvaluationService.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { t } from '$lib/stores/stores.js';
	import StudentData from '$lib/components/shared/StudentData.svelte';
	import { ArrowRightOutline } from 'flowbite-svelte-icons';

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
			user_id: $page.data.user.id_user,
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
	let tableName = 'Evaluaciones del estudiante';
	let studentServ = studentService.getInstance();

	const gotoReports = () => {
		goto('/academix/reports');
	};

	const refreshItems = () => {
		studentServ.getStudentByUser($page.data.user.id_user).then((i) => {
			student = i;

			let evaluationServ = evaluationService.getInstance();
			// TODO: Create evaluations for a student with user
			evaluationServ.getEvaluationsOfStudent(student.student_id).then((j) => {
				evaluations = j;
			});
		});
	};
</script>

<section class="flex flex-col py-2 pb-2 pt-4 justify-center items-center w-full">
	<h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
		{$t('Perfil de estudiante')}
	</h1>
	<Card
		cardClass="max-w-full justify-normal xs:w-[70%] lg:w-[80%] xl:w-auto"
		divClass="flex xs:flex-col lg:flex-row xs:gap-2 lg:gap-4 xl:gap-5 xs:justify-center lg:justify-start xl:justify-center xs:items-center lg:items-stretch"
		isProfile={true}
	>
		<svelte:fragment slot="avatar-slot">
			<Avatar size="xl" class="xs:rounded-sm xs:h-36 xs:w-28 xl:w-36 2xl:w-auto 2xl:rounded-full" />
		</svelte:fragment>
		<div class="flex xs:flex-col xl:flex-row xl:gap-2 flex-wrap items-stretch">
			<div class="flex flex-col gap-5 mb-4">
				<StudentData
					>{$t('Código')}:
					<span slot="info">{student.student_code}</span>
				</StudentData>
				<StudentData
					>{$t('Nombre')}:
					<span slot="info">{student.student_name}</span>
				</StudentData>
				<StudentData
					>{$t('Apellidos')}:
					<span slot="info">{student.lastname}</span>
				</StudentData>
				<StudentData
					>{$t('Año académico')}:
					<span slot="info">{student.year}</span>
				</StudentData>
				{#if student.unenrollment_reason}
					<div class="xs:hidden xl:block">
						<StudentData
							>{$t('Causa de baja')}:
							<span slot="info">{student.unenrollment_reason}</span>
						</StudentData>
					</div>
				{/if}
			</div>
			<div class="flex flex-col gap-5 mb-4">
				<StudentData
					>{$t('Grupo')}:
					<span slot="info">{student.group_number}</span>
				</StudentData>
				<StudentData
					>{$t('Sexo')}:
					<span slot="info">{student.sex}</span>
				</StudentData>
				<StudentData
					>{$t('Municipio')}:
					<span slot="info">{student.municipality}</span>
				</StudentData>
				<StudentData
					>{$t('Situación académica')}:
					<span slot="info">{student.academic_situation}</span>
				</StudentData>
				{#if student.unenrollment_reason}
					<div class="xl:hidden xs:block">
						<StudentData
							>{$t('Causa de baja')}:
							<span slot="info">{student.unenrollment_reason}</span>
						</StudentData>
					</div>
				{/if}
			</div>
		</div>
	</Card>

	<Button class="xs:w-[40%] xl:w-[30%] xs:mt-4 xl:mt-6" on:click={gotoReports}>
		{$t('Reportes')}<ArrowRightOutline class="w-3.5 h-3.5 ms-2 text-white" />
	</Button>

	<div class="w-full">
		<Table
			{filters}
			{isCreatable}
			{isDeletable}
			{isFilterable}
			{isUpdatable}
			items={evaluations}
			{refreshItems}
			{tableName}
		/>
	</div>
</section>
