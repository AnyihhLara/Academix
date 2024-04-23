import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('STUDENT/');
	if (!locals.user || locals.user.role !== 'Estudiante') {
		throw new error(401)
	}
}
