<script>
	import Card from '$lib/components/shared/Card.svelte';
	import { Avatar, Label } from 'flowbite-svelte';
	let student;
</script>

<section class="py-2 pb-2 pt-4 grid justify-center w-full">
	<h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
		Perfil de estudiante
	</h1>
	<Card
		divClass="flex gap-5 items-start justify-center"
		cardClass="max-w-full"
		divBtnClass="flex justify-end"
	>
		<svelte:fragment slot="avatar-slot">
			<Avatar size="xl" />
		</svelte:fragment>
		<div class="flex gap-5">
			<div class="grid gap-5 mb-4">
				<Label>Código:<span class="mx-2">03111466770</span></Label> 
				<Label>Nombre:<span class="mx-2">Anyeleni</span></Label>
				<Label>Apellidos:<span class="mx-2">Lara Santana</span></Label>
				<Label>Año académico:<span class="mx-2">2</span></Label>
			</div>
			<div class="grid gap-5 mb-4">
				<Label>Grupo:<span class="mx-2">22</span></Label>
				<Label>Sexo:<span class="mx-2">Femenino</span></Label>
				<Label>Municipio:<span class="mx-2">Plaza de la Revolución</span></Label>
				<Label>Situación académica:<span class="mx-2">Promovido</span></Label>
			</div>
			<!-- <div>
				{#if student.academicSituation === 'Baja'}
				<Label>Causa de baja:</Label>
				{/if}
			</div> -->
		</div>
		<img src="/reports.jpg" alt="reportes" class="w-52 h-32" />
		<span slot="btn-text">Reportes</span>
	</Card>
</section>
