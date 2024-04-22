import authService from '$lib/services/AuthService.js';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const handle = async ({ event, resolve }) => {
	console.log('HOOK');
	let view = '/auth/login';
	const token = event.cookies.get('jwt');

	if (!token) {
		console.log('NO TOKEN');
		resolve(event);
	}

	try {
		const { id_user, username, id_role, role_name } = jwt.verify(token, env.SECRET_KEY);

		if (id_user && id_role) {
			let authServ = authService.getInstance();
			let routes = authServ.getAuthorizedRoutes(role_name);

			if (routes.length > 0) view = routes[0];
			event.locals.user = {
				id_user: id_user,
				username: username,
				id_role: id_role,
				role: role_name
			};
		}
	} catch (err) {
		console.log(err.message);
	} finally {
		event.locals.view = view;
		console.log(view);
	}

	return await resolve(event);
};
