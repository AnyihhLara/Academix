import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || (locals.user.role !== 'Secretario' && locals.user.role !== 'Profesor')) {
		throw new error(401)
	}
}
