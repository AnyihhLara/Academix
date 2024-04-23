import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	if ( !locals.user)
        throw redirect(302, locals.view);

   else if( locals.user.role !== 'Secretario') {
		throw new error(401)
	}
}
