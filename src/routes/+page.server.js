import { redirect } from '@sveltejs/kit';
import { view } from '$lib/stores/stores.js';
import { get } from 'svelte/store';

export const load = async () => {
	if (get(view) === '/') {
		view.set('/auth/login');
	}
	throw redirect(302, get(view));
};
