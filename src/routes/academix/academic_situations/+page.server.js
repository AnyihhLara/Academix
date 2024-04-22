import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'Secretario') {
		throw redirect(302, locals.view);
	}
}
