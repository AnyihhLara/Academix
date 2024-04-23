import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('SECRETARY/');
	if (!locals.user || locals.user.role !== 'Secretario') {
		error(401)
        throw new error(401)
	}
}
