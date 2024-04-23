import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('SECRETARY/');
	if ( !locals.user)
        throw redirect(302, locals.view);

   else if( locals.user.role !== 'Secretario') {
		error(403)
        throw new error(403)
	}
}
