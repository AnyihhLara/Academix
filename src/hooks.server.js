import sequelize from '$lib/database/db.js';
import { rolesTable, usersTable } from '$lib/database/dbTables.js';
import authService from '$lib/services/AuthService.js';
import { view } from '$lib/stores/stores.js';
import CryptoJS from 'crypto-js';
import { env } from '$env/dynamic/private';

export const handle = async ({ event, resolve }) => {
	const user = event.cookies.get('academix-user');
	const pass = event.cookies.get('academix-pass');

	console.log('hola', user, pass);

	if (!user || !pass) {
		return await resolve(event);
	}

	const result = await sequelize
		.transaction(async (t) => {
			const s = await sequelize.query(
				`
            SELECT u.*
            FROM ${usersTable} u
            WHERE u.user_name = :user`,
				{
					transaction: t,
					type: sequelize.QueryTypes.SELECT,
					replacements: { user }
				}
			);
			if (s.length === 0) throw new Error('Usuario incorrecto o no autorizado');
			const hashed = CryptoJS.SHA256(env.SECRET_KEY + pass).toString();
			console.log(hashed);
			if (s[0].user_password !== hashed) throw new Error('Contraseña incorrecta');
			return {
				id_user: s[0].user_id,
				username: s[0].user_name,
				id_role: s[0].role_id
			};
		})
		.catch((e) => {
			console.log(e.message);
		});

	if (result) {
		const { id_user, username, id_role } = result;

		if (id_user && username && id_role) {
			const { role_name } = await sequelize
				.transaction(async (t) => {
					const s = await sequelize.query(
						`
              SELECT r.role_name
              FROM ${rolesTable} r
              WHERE r.role_id=:id_role`,
						{
							type: sequelize.QueryTypes.SELECT,
							transaction: t,
							replacements: { id_role }
						}
					);

					return s[0];
				})
				.catch((e) => {
					console.log(e.message);
				});

			event.locals.user = {
				id_user: id_user,
				user: user,
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
	}

	return await resolve(event);
};
