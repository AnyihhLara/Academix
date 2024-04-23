import { error } from '@sveltejs/kit';

export async function load({ locals }) {
	console.log('ACADEMIX/');

	if (!locals.user) {
		throw new error(401)
	}
	return {
		user: locals.user,
		view: locals.view
	};
}
