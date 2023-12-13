import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	let { role_id: role_id } = params;
	role_id = Number(role_id);
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(`SELECT read_role(:role_id)`, {
				type: sequelize.QueryTypes.SELECT,
				transaction: t,
				replacements: { role_id: role_id }
			});
		})
		.catch((err) => {
			throw error(400, { message: err.message });
		});

	if (result.length === 0)
		throw error(404, {
			message: `Rol con id ${role_id} no encontrado`
		});
	return json(result[0]);
}

export async function DELETE({ params }) {
	let { role_id } = params;
	role_id = Number(role_id);
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(`SELECT delete_role(:role_id)`, {
				replacements: { role_id },
				type: sequelize.QueryTypes.DELETE,
				transaction: t
			});
		})
		.catch((err) => {
			throw error(400, { message: err.message });
		});
	return json(result);
}

export async function PUT({ params, request }) {
	let { role_id } = params;
	role_id = Number(role_id);
	const body = await request.json(); //new attribute values for rol
	const result = await sequelize.transaction(async (t) => {
		await sequelize.query(`SELECT update_role(:role_id, :role_name)`, {
			type: sequelize.QueryTypes.SELECT,
			transaction: t,
			replacements: {
				...body,
				role_id
			}
		});
		return await sequelize.query(`SELECT read_role(:role_id)`, {
			type: sequelize.QueryTypes.SELECT,
			transaction: t,
			replacements: {
				...body,
				role_id
			}
		});
	});

	if (result.length === 0) throw new error(404, { message: `Rol con id ${role_id} no encontrado` });
	return json(result[0]);
}