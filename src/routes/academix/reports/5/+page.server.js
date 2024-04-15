import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if (
		!locals.user ||
		(locals.user.role !== 'Secretario' &&
			locals.user.role !== 'Profesor' &&
			locals.user.role !== 'Estudiante')
	)
		throw redirect(302, locals.view);
}
