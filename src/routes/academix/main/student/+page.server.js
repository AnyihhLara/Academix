import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('STUDENT/');
	if (!locals.user || locals.user.role !== 'Estudiante') {
		throw redirect(302, locals.view);
	}
}
