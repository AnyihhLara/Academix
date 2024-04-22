import { redirect } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('ACADEMIX/');

	if (!locals.user) {
		throw redirect(302, locals.view);
	}
	return {
		user: locals.user,
		view: locals.view
	};
}
