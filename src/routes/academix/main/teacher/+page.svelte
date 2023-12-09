<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import authService from '$lib/services/AuthService.js';
	import { view } from '$lib/stores/stores.js';
	import { onMount } from 'svelte';

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
	});
	let defaultClass = 'flex-row space-y-5';
	let btnText = 'Ver más';

	// const gotoStudents = () => {
	// 	goto('/academix/students');
	// };
	// const gotoSubjects = () => {
	// 	goto('/academix/subjects');
	// };
	const gotoEvaluations = () => {
		goto('/academix/evaluations');
	};
	const gotoReports = () => {
		goto('/academix/reports');
	};
</script>

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
		Módulos Profesor
	</h1>
	<div class="{defaultClass} justify-center items-center">
		<div class="flex gap-5 justify-center">
			<div class={defaultClass}>
				<Card>
					<span slot="tittle">Listado de estudiantes</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card>
					<span slot="tittle">Listado de asignaturas</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card on:click={gotoEvaluations}>
					<span slot="tittle">Listado de evaluaciones</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
			<div>
				<Card on:click={gotoReports}>
					<span slot="tittle">Reportes</span>
					<div class="flex justify-center">
						<img src="/reports.jpg" alt="Reportes" class="mb-3 h-72" />
					</div>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
		</div>
	</div>
</section>
