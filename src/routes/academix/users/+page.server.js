import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	if (!locals.user || locals.user.role !== 'Administrador') {
		throw new error(401)
	}
}
