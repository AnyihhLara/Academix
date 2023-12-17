import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	let { evaluation_id } = params;
	evaluation_id = Number(evaluation_id);
	const result = await sequelize
		.transaction(async (t) => {
			await sequelize.query(`SELECT read_evaluation(:evaluation_id)`, {
				type: sequelize.QueryTypes.SELECT,
				transaction: t,
				replacements: { evaluation_id }
			});
			return await sequelize.query(`SELECT read_evaluation(:evaluation_id)`, {
				type: sequelize.QueryTypes.SELECT,
				transaction: t,
				replacements: { evaluation_id }
			});
		})
		.catch((err) => {
			throw error(400, { message: err.message });
		});

	if (result.length === 0)
		throw error(404, {
			message: `Evaluación con id ${evaluation_id} no encontrada`
		});
	return json(result[0]);
}

export async function DELETE({ params }) {
	let { evaluation_id } = params;
	evaluation_id = Number(evaluation_id);
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(`SELECT delete_evaluation(:evaluation_id)`, {
				replacements: { evaluation_id },
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
	let { evaluation_id } = params;
	evaluation_id = Number(evaluation_id);
	const body = await request.json(); //new attribute values for evaluation
	const result = await sequelize.transaction(async (t) => {
		await sequelize.query(
			`SELECT update_evaluation(:evaluation_id, :evaluation_type_id, :evaluation_date, :student_id, :subject_id)`,
			{
				type: sequelize.QueryTypes.SELECT,
				transaction: t,
				replacements: {
					...body,
					evaluation_id
				}
			}
		);
		return await sequelize.query(`SELECT read_evaluation(:evaluation_id)`, {
			type: sequelize.QueryTypes.SELECT,
			transaction: t,
			replacements: { evaluation_id }
		});
	});

	if (result.length === 0)
		throw new error(404, { message: `Evaluación con id ${evaluation_id} no encontrada` });
	return json(result[0]);
}
