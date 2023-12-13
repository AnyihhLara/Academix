import { redirect } from '@sveltejs/kit';
import { view } from '$lib/stores/stores.js';
import { get } from 'svelte/store';

export const load = async ({ locals }) => {
	if (!locals.user || (locals.user.role !== 'Profesor' && locals.user.role !== 'Estudiante')) {
		throw redirect(302, get(view));
	}
};