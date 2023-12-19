import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
	let { student_id } = params;
	student_id = Number(student_id);
	const result = await sequelize
		.transaction(async (t) => {
			await sequelize.query(`SELECT read_student(:student_id)`, {
				type: sequelize.QueryTypes.SELECT,
				transaction: t,
				replacements: { student_id }
			});
			return await sequelize.query(`SELECT * FROM read_student(:student_id)`, {
				type: sequelize.QueryTypes.SELECT,
				transaction: t,
				replacements: { student_id }
			});
		})
		.catch((err) => {
			throw error(400, { message: err.message });
		});

	if (result.length === 0)
		throw error(404, {
			message: `Estudiante con id ${student_id} no encontrado`
		});
	return json(result[0]);
}

export async function DELETE({ params }) {
	let { student_id } = params;
	student_id = Number(student_id);
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(`SELECT delete_student(:student_id)`, {
				replacements: { student_id },
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
	let { student_id } = params;
	student_id = Number(student_id);
	const body = await request.json(); //new attribute values for student
	try {
		const result = await sequelize.transaction(async (t) => {
			await sequelize.query(
				`SELECT update_student(
                                    :student_id,  
                                    :student_code, 
                                    :student_name, 
                                    :student_lastname, 
                                    :student_sex, 
                                    :municipality, 
                                    :academic_situation_id, 
                                    :unenrollment_reason_id, 
                                    :year_id, 
                                    :group_id, 
                                    :user_id)`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t,
					replacements: {
						...body,
						student_id
					}
				}
			);
			return await sequelize.query(`SELECT read_student(:student_id)`, {
				type: sequelize.QueryTypes.SELECT,
				transaction: t,
				replacements: { student_id }
			});
		});

		if (result.length === 0)
			throw new error(404, { message: `Estudiante con id ${student_id} no encontrado` });
		return json(result[0]);
	}
	catch (e) { throw error(400, { message: e.message }) }
}
