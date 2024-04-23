import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('STUDENT/');
	if ( !locals.user)
        throw redirect(302, locals.view);

   else if( locals.user.role !== 'Estudiante') {
		throw new error(403)
	}
}
