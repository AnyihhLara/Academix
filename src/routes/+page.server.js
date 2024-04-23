import { error } from '@sveltejs/kit';

export async function load({ cookies, locals }) {
	const token = cookies.get('jwt');
	console.log('PAGE/');

	if (!token && !locals.user) {
		

		throw new error(401)
	}
	else
		return {
			user: locals.user,
			view: locals.view
		};
}
