<script>
	import Card from '$lib/components/shared/Card.svelte';
	let defaultClass = 'flex-row space-y-5';
	let btnText = 'Ver más';
</script>

<section class="px-4 pt-3 pb-4">
	<h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
		Modulos Secretaría
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
			</div>
			<div class={defaultClass}>
				<Card>
					<span slot="tittle">Años existentes</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
				<Card>
					<span slot="tittle">Grupos existentes</span>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
			<div>
				<Card>
					<span slot="tittle">Reportes</span>
					<div class="flex justify-center">
						<img src="/reports.jpg" alt="Reportes" class="mb-1.5 h-36 w-96" />
					</div>
					<span slot="btn-text">{btnText}</span>
				</Card>
			</div>
		</div>
		<div class="flex gap-5 justify-center">
			<Card>
				<span slot="tittle">Listado de situaciones académicas existentes</span>
				<span slot="btn-text">{btnText}</span>
			</Card>
			<Card>
				<span slot="tittle">Listado de causas de baja existentes</span>
				<span slot="btn-text">{btnText}</span>
			</Card>
			<Card>
				<span slot="tittle">Listado de tipos de evaluaciones existentes</span>
				<span slot="btn-text">{btnText}</span>
			</Card>
		</div>
	</div>
</section>
