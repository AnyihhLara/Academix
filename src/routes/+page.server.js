import { redirect } from '@sveltejs/kit';

export async function load({ cookies, locals }) {
	const token = cookies.get('jwt');
	console.log('PAGE/');

	if (!token && !locals.user) throw redirect(302, locals.view);
}
