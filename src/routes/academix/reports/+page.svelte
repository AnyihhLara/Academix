<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { t } from '$lib/stores/stores.js';

	const gotoReport1 = () => {
		goto('/academix/reports/1');
	};
	const gotoReport2 = () => {
		goto('/academix/reports/2');
	};
	const gotoReport3 = () => {
		goto('/academix/reports/3');
	};
	const gotoReport4 = () => {
		goto('/academix/reports/4');
	};
	const gotoReport5 = () => {
		goto('/academix/reports/5');
	};
	const gotoReport6 = () => {
		goto('/academix/reports/6');
	};
	const gotoReport7 = () => {
		goto('/academix/reports/7');
	};
	const gotoReport8 = () => {
		goto('/academix/reports/8');
	};
	const gotoReport9 = () => {
		goto('/academix/reports/9');
	};
</script>

<section class="pt-3 pb-5">
	<h1
		class="text-center xs:text-xl lg:text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100"
	>
		{$t('Módulos Reportes')}:
		{$t($page.data.user.role)}
	</h1>
	<div class="flex justify-center items-center">
		{#if $page.data.user.role !== 'Estudiante'}
			<div
				class="xs:flex xs:flex-col xs:gap-4 xs:w-[80%] xl:grid xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 lg:w-auto"
			>
				<Card on:click={gotoReport1}>
					<span slot="title">{$t('Listado de los estudiantes por grupo')}</span>
				</Card>
				<Card on:click={gotoReport2}>
					<span slot="title">{$t('Listado de las asignaturas por año')}</span>
				</Card>
				<Card on:click={gotoReport3}>
					<span slot="title">{$t('Listado de las evaluaciones por grupo en cada asignatura')}</span>
				</Card>
				<Card on:click={gotoReport4}>
					<span slot="title"
						>{$t(
							'Listado de los promedios finales obtenidos por los estudiantes de cada grupo'
						)}</span
					>
				</Card>
				<Card on:click={gotoReport5}>
					<span slot="title">{$t('Escalafón')}</span>
				</Card>
				<Card on:click={gotoReport6}>
					<span slot="title">{$t('Certificación de notas de cada estudiante')}</span>
				</Card>
				<Card on:click={gotoReport7}>
					<span slot="title"
						>{$t('Listado de los estudiantes desaprobados por grupo en un rango de fecha')}</span
					>
				</Card>
				<Card on:click={gotoReport8}>
					<span slot="title">{$t('Listado de los estudiantes que causan baja en un curso')}</span>
				</Card>
				<Card on:click={gotoReport9}>
					<span slot="title">{$t('Listado de los estudiantes repitentes por año')}</span>
				</Card>
			</div>
		{:else}
			<div class="flex flex-col gap-4 flex-wrap items-stretch xs:w-[80%] lg:w-auto">
				<Card on:click={gotoReport4}>
					<span slot="title"
						>{$t(
							'Listado de los promedios finales obtenidos por los estudiantes de cada grupo'
						)}</span
					>
				</Card>
				<Card on:click={gotoReport5}>
					<span slot="title">{$t('Escalafón')}</span>
				</Card>
			</div>
		{/if}
	</div>
</section>
