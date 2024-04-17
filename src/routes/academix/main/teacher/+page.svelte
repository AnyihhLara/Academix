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
	const gotoEvaluations = () => {
		goto('/academix/evaluations');
	};
	const gotoReports = () => {
		goto('/academix/reports');
	};
</script>

<section class="px-4 pt-3 pb-4 xs:pb-0">
	<h1
		class="text-center text-2xl xl:mt-2 mb-4 font-semibold text-primary-950 dark:text-primary-100"
	>
		{$t('Módulos Profesor')}
	</h1>
	<div class="flex justify-center items-center">
		<div class="flex items-stretch flex-wrap gap-4 xs:flex-col xl:flex-row xs:w-[80%] lg:w-auto">
			<div class="flex flex-col gap-4">
				<Card on:click={gotoStudents}>
					<span slot="title">{$t('Listado de estudiantes')}</span>
	 
				</Card>
				<Card on:click={gotoSubjects}>
					<span slot="title">{$t('Listado de asignaturas')}</span>
	 
				</Card>
				<Card on:click={gotoEvaluations}>
					<span slot="title">{$t('Listado de evaluaciones')}</span>
	 
				</Card>
			</div>
			<div>
				<Card on:click={gotoReports}>
					<span slot="title">{$t('Reportes')}</span>
					<div class="flex justify-center">
						<img alt="Reportes" class="mb-3 xl:h-72 xs:h-fit" src="/reports.jpg" />
					</div>
	 
				</Card>
			</div>
		</div>
	</div>
</section>
