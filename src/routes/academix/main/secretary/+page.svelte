<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { goto } from '$app/navigation';
	import { t } from '$lib/stores/stores.js';

	const gotoStudents = () => {
		goto('/academix/students');
	};
	const gotoSubjects = () => {
		goto('/academix/subjects');
	};
	const gotoYears = () => {
		goto('/academix/years');
	};
	const gotoStudentsGroups = () => {
		goto('/academix/students_groups');
	};
	const gotoAcademicSituations = () => {
		goto('/academix/academic_situations');
	};
	const gotoUnenrollmentReasons = () => {
		goto('/academix/unenrollment_reasons');
	};
	const gotoEvaluationTypes = () => {
		goto('/academix/evaluation_types');
	};
	const gotoReports = () => {
		goto('/academix/reports');
	};
</script>

<section class="px-4 pt-3 pb-6">
	<h1 class="text-center text-2xl mt-1 mb-2 font-semibold text-primary-950 dark:text-primary-100">
		{$t('Módulos Secretaría')}
	</h1>
	<div class="flex justify-center items-center">
		<div
			class="xs:flex xs:flex-col xs:gap-4 xs:w-[80%] xl:grid xl:grid-cols-2 3xl:grid-cols-3 lg:w-auto"
		>
			<Card on:click={gotoStudents}>
				<span slot="title">{$t('Listado de estudiantes')}</span>
 
			</Card>
			<Card on:click={gotoSubjects}>
				<span slot="title">{$t('Listado de asignaturas')}</span>
 
			</Card>
			<Card on:click={gotoAcademicSituations}>
				<span slot="title">{$t('Listado de situaciones académicas existentes')}</span>
 
			</Card>
			<Card on:click={gotoYears}>
				<span slot="title">{$t('Años existentes')}</span>
 
			</Card>
			<Card on:click={gotoStudentsGroups}>
				<span slot="title">{$t('Grupos existentes')}</span>
 
			</Card>
			<Card on:click={gotoUnenrollmentReasons}>
				<span slot="title">{$t('Listado de causas de baja existentes')}</span>
 
			</Card>
			<Card on:click={gotoEvaluationTypes}>
				<span slot="title">{$t('Listado de tipos de evaluaciones existentes')}</span>
 
			</Card>
			<Card on:click={gotoReports}>
				<span slot="title">{$t('Reportes')}</span>
				<div class="flex justify-center">
					<img alt="Reportes-Reports" class="mb-1.5 h-36 w-96" src="/reports.jpg" />
				</div>
 
			</Card>
		</div>
	</div>
</section>
