<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { goto } from '$app/navigation';
	import { t } from '$lib/stores/stores.js';

	let defaultClass = 'flex-row space-y-5';
	$: btnText = $t('Ver más');

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

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
		{$t('Módulos Profesor')}
	</h1>
	<div class="{defaultClass} justify-center items-center">
		<div class="flex gap-5 justify-center">
			<div class={defaultClass}>
				<Card on:click={gotoStudents}>
					<span slot="tittle">{$t('Listado de estudiantes')}</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card on:click={gotoSubjects}>
					<span slot="tittle">{$t('Listado de asignaturas')}</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card on:click={gotoEvaluations}>
					<span slot="tittle">{$t('Listado de evaluaciones')}</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
			<div>
				<Card on:click={gotoReports}>
					<span slot="tittle">{$t('Reportes')}</span>
					<div class="flex justify-center">
						<img alt="Reportes" class="mb-3 h-72" src="/reports.jpg" />
					</div>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
		</div>
	</div>
</section>
