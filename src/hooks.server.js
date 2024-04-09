import authService from '$lib/services/AuthService.js';
import { view } from '$lib/stores/stores.js';
import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

export const handle = async ({ event, resolve }) => {
	console.log('HOOK');
	const token = event.cookies.get('jwt');

	if (!token) {
		console.log('NO TOKEN');
		return await resolve(event);
	}

	try {
		const { id_user, username, id_role, role_name } = jwt.verify(token, env.SECRET_KEY);

		if (id_user && id_role) {
			event.locals.user = {
				id_user: id_user,
				user: username,
				id_role: id_role,
				role: role_name
			};

			let authServ = authService.getInstance();
			let routes = authServ.getAuthorizedRoutes(role_name);
			if (routes.length > 0) view.set(routes[0]);
			else {
				view.set('/auth/login');
			}
		}
	} catch (err) {
		view.set('/auth/login');
	}

	return await resolve(event);
};
