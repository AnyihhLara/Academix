import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('TEACHER/');
	if (!locals.user || locals.user.role !== 'Profesor') {
		throw new error(401)
	}
}
