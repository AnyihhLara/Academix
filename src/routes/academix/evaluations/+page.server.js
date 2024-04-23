import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if ( !locals.user)
        throw redirect(302, locals.view);

   else if( (locals.user.role !== 'Profesor' && locals.user.role !== 'Estudiante')) {
		throw new error(403)
	}
}
