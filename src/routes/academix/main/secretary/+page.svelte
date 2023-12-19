<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { goto } from '$app/navigation';
	import { Button, Input, Label, Modal, Popover } from 'flowbite-svelte';
	import { EditOutline, ExclamationCircleOutline } from 'flowbite-svelte-icons';
	import { currentSchoolYear } from '$lib/stores/stores.js';

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
	let openModal = false;
	let schoolYear = '2022-2023'; //temp
	let isEditable = false; //temp
	let handleUpdate = () => {
		let schoolYearParts = schoolYear.split('-');
		let schoolYearStart = parseInt(schoolYearParts[0]);
		let schoolYearEnd = parseInt(schoolYearParts[1]);
		schoolYearStart++;
		schoolYearEnd++;
		schoolYear = `${schoolYearStart}-${schoolYearEnd}`; //temp
		updateData();
		openModal = false;
	};
	let handleCancel = () => {
		openModal = false;
	};
	function updateData() {}
</script>

<section class="px-4 pt-3 pb-6">
	<h1 class="text-center text-2xl mt-1 font-semibold text-primary-950 dark:text-primary-100">
		Módulos Secretaría
	</h1>
	<div class="flex items-center justify-end mb-4">
		<Label for="school-year" class="text-2xl text-primary-950 dark:text-primary-100 mr-10"
			>Curso escolar actual
			<div class="flex justify-center items-center gap-4">
				<Label class="text-secondary-700 text-xl text-center dark:text-primary-300"
					>{schoolYear}</Label
				>
				{#if isEditable}
					<EditOutline on:click={() => (openModal = !openModal)} />
				{:else}
					<EditOutline class="text-gray-500 dark:text-gray-400 cursor-not-allowed" id="b1" />
					<Popover color="red" class="w-64 text-sm font-light " triggeredBy="#b1"
						>No se puede modificar porque existen estudiantes sin nota final</Popover
					>
				{/if}
			</div>
		</Label>
	</div>
	<div class="{defaultClass} justify-center items-center">
		<div class="flex gap-5 justify-center">
			<div class={defaultClass}>
				<Card on:click={gotoStudents}>
					<span slot="tittle">Listado de estudiantes</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card on:click={gotoSubjects}>
					<span slot="tittle">Listado de asignaturas</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
			<div class={defaultClass}>
				<Card on:click={gotoYears}>
					<span slot="tittle">Años existentes</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card on:click={gotoStudentsGroups}>
					<span slot="tittle">Grupos existentes</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
			<div>
				<Card on:click={gotoReports}>
					<span slot="tittle">Reportes</span>
					<div class="flex justify-center">
						<img alt="Reportes" class="mb-1.5 h-36 w-96" src="/reports.jpg" />
					</div>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
		</div>
		<div class="flex gap-5 justify-center">
			<Card on:click={gotoAcademicSituations}>
				<span slot="tittle">Listado de situaciones académicas existentes</span>
				<span slot="btn-text">{btnText}</span>
			</Card>
			<Card on:click={gotoUnenrollmentReasons}>
				<span slot="tittle">Listado de causas de baja existentes</span>
				<span slot="btn-text">{btnText}</span>
			</Card>
			<Card on:click={gotoEvaluationTypes}>
				<span slot="tittle">Listado de tipos de evaluaciones existentes</span>
				<span slot="btn-text">{btnText}</span>
			</Card>
		</div>
	</div>
</section>

<Modal
	title="Modificar curso escolar actual"
	bind:open={openModal}
	autoclose
	size="sm"
	class="w-full"
>
	<ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
	<p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
		¿Está seguro que desea modificar el curso escolar actual?
		<br />
		(esta acción es automática e irreversible)
	</p>
	<div class="flex justify-center items-center space-x-4">
		<Button color="red" on:click={handleUpdate}>Sí, estoy seguro</Button>
		<Button color="light" on:click={handleCancel}>No, cancelar</Button>
	</div>
</Modal>
