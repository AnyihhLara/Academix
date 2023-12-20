import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';
import { rolesTable, usersTable } from '$lib/database/dbTables.js';
import { env } from '$env/dynamic/private';
import CryptoJS from 'crypto-js';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	let result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT user_id, user_name, role_name
                    FROM ${usersTable} ut
                    JOIN ${rolesTable} rt ON rt.role_id = ut.role_id 
                    LIMIT ${limit}`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		})
		.catch((err) => {
			throw error(400, { message: err.message });
		});

	// if (result && result.length > 0) {
	// 	result = result.map((user) => {
	// 		console.log(user.user_password);
	// 		const bytes = CryptoJS.AES.decrypt(user.user_password.toString(), env.SECRET_KEY);
	// 		console.log(bytes);
	// 		let pass = bytes.toString(CryptoJS.enc.Utf8);
	// 		if (pass === '') pass = user.user_password;
	// 		return { ...user, user_password: pass };
	// 	});
	// }

	return json(result);
}

export async function POST({ request }) {
	let body = await request.json(); //new user
	body.user_password = CryptoJS.SHA256(env.SECRET_KEY + body.user_password).toString();
	const result = await sequelize.transaction(async (t) => {
		try {
			await sequelize.query(`SELECT create_users(:user_name, :user_password, :role_id)`, {
				replacements: body,
				type: sequelize.QueryTypes.SELECT,
				transaction: t
			});
			return await sequelize.query(
				`SELECT * 
                    FROM ${usersTable} 
                    ORDER BY user_id DESC 
                    LIMIT 1`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		} catch (e) {
			throw error(400, { message: e.message });
		}
	});
	return json(result[0]);
}
