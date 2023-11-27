import {readable, writable} from 'svelte/store';
import CarsTable from "$lib/components/tables/CarsTable.svelte";

export const selectedTable = writable(null);
export const popup = writable({message: '', type: 'error'});
export const loading = writable(false)
export const tableNames = readable([
    {name: 'Cars', component: CarsTable},
    {name: 'Evaluaciones', component: null},
    {name: 'Estudiantes', component: null},
    {name: 'Grupos estudiantiles', component: null},
    {name: 'Asignaturas', component: null}
]);
