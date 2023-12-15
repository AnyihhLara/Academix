<script>
    import Card from '$lib/components/shared/Card.svelte';
    import {goto} from '$app/navigation';
    import {page} from '$app/stores';

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
    let defaultClass = 'flex-row space-y-5';
    let btnText = 'Ver más';
</script>

<section class="px-4 pt-3 pb-5">
    <h1 class="text-center text-2xl mb-4 font-semibold text-primary-950 dark:text-primary-100">
        Módulos Reportes {$page.data.role}
    </h1>
    <div class="{defaultClass} justify-center items-center">
        <div class="flex gap-5 justify-center">
            {#if $page.data.role !== 'Estudiante'}
                <div class={defaultClass}>
                    <Card on:click={gotoReport1}>
                        <span slot="tittle">Listado de los estudiantes por grupo</span>
                        <span slot="btn-text">{btnText}</span>
                    </Card>
                    <Card on:click={gotoReport2}>
                        <span slot="tittle">Listado de las asignaturas que se imparten en cada año</span>
                        <span slot="btn-text">{btnText}</span>
                    </Card>
                    <Card on:click={gotoReport3}>
                        <span slot="tittle">Listado de las evaluaciones por grupo en cada asignatura</span>
                        <span slot="btn-text">{btnText}</span>
                    </Card>
                </div>
            {/if}
            <div class={defaultClass}>
                <Card on:click={gotoReport4}>
					<span slot="tittle"
                    >Listado de los promedios finales obtenidos por los estudiantes de cada grupo</span
                    >
                    <span slot="btn-text">{btnText}</span>
                </Card>
                <Card on:click={gotoReport5}>
                    <span slot="tittle">Escalafón</span>
                    <span slot="btn-text">{btnText}</span>
                </Card>
                {#if $page.data.role !== 'Estudiante'}
                    <div>
                        <Card on:click={gotoReport6}>
                            <span slot="tittle">Certificación de notas de cada estudiante</span>
                            <span slot="btn-text">{btnText}</span>
                        </Card>
                    </div>
                {/if}
            </div>
            {#if $page.data.role !== 'Estudiante'}
                <div class={defaultClass}>
                    <Card on:click={gotoReport7}>
						<span slot="tittle"
                        >Listado de los estudiantes desaprobados por grupo para un rango de fecha</span
                        >
                        <span slot="btn-text">{btnText}</span>
                    </Card>
                    <Card on:click={gotoReport8}>
                        <span slot="tittle">Listado de los estudiantes que causan baja en un curso</span>
                        <span slot="btn-text">{btnText}</span>
                    </Card>
                    <Card on:click={gotoReport9}>
                        <span slot="tittle">Listado de los repitentes por año</span>
                        <span slot="btn-text">{btnText}</span>
                    </Card>
                </div>
            {/if}
        </div>
    </div>
</section>
