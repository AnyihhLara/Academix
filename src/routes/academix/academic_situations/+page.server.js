import { redirect } from '@sveltejs/kit';
import { view } from '$lib/stores/stores.js';
import { get } from 'svelte/store';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'Secretario') {
		throw redirect(302, get(view));
	}

	return locals.user;
}
