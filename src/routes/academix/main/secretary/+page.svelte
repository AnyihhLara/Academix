<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { goto } from '$app/navigation';

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

	let defaultClass = 'flex-row space-y-5';
	let btnText = 'Ver más';
</script>

<section class='px-4 pt-3 pb-6'>
	<h1 class='text-center text-2xl mt-1 mb-2 font-semibold text-primary-950 dark:text-primary-100'>
		Módulos Secretaría
	</h1>
	<div class='{defaultClass} justify-center items-center'>
		<div class='flex gap-5 justify-center'>
			<div class={defaultClass}>
				<Card on:click={gotoStudents}>
					<span slot='tittle'>Listado de estudiantes</span>
					<span slot='btn-text'>{btnText}</span>
				</Card>
				<Card on:click={gotoSubjects}>
					<span slot='tittle'>Listado de asignaturas</span>
					<span slot='btn-text'>{btnText}</span>
				</Card>
			</div>
			<div class={defaultClass}>
				<Card on:click={gotoYears}>
					<span slot='tittle'>Años existentes</span>
					<span slot='btn-text'>{btnText}</span>
				</Card>
				<Card on:click={gotoStudentsGroups}>
					<span slot='tittle'>Grupos existentes</span>
					<span slot='btn-text'>{btnText}</span>
				</Card>
			</div>
			<div>
				<Card on:click={gotoReports}>
					<span slot='tittle'>Reportes</span>
					<div class='flex justify-center'>
						<img alt='Reportes' class='mb-1.5 h-36 w-96' src='/reports.jpg' />
					</div>
					<span slot='btn-text'>{btnText}</span>
				</Card>
			</div>
		</div>
		<div class='flex gap-5 justify-center'>
			<Card on:click={gotoAcademicSituations}>
				<span slot='tittle'>Listado de situaciones académicas existentes</span>
				<span slot='btn-text'>{btnText}</span>
			</Card>
			<Card on:click={gotoUnenrollmentReasons}>
				<span slot='tittle'>Listado de causas de baja existentes</span>
				<span slot='btn-text'>{btnText}</span>
			</Card>
			<Card on:click={gotoEvaluationTypes}>
				<span slot='tittle'>Listado de tipos de evaluaciones existentes</span>
				<span slot='btn-text'>{btnText}</span>
			</Card>
		</div>
	</div>
</section>
