import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';
import {
	evaluationTable,
	evaluationTypeTable,
	studentTable,
	subjectTable
} from '$lib/database/dbTables.js';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const student_id = params.get('student_id');
	let where = '';

	if (student_id) {
		where = `WHERE e.student_id = ${student_id}`;
	}

	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT e.evaluation_id,
                            s.student_name,
                            e.evaluation_date,
                            sub.subject_name,
                            et.evaluation_numerical_value
                    FROM ${evaluationTable} e
                        JOIN ${subjectTable} sub ON sub.subject_id = e.subject_id
                        JOIN ${evaluationTypeTable} et ON et.evaluation_type_id = e.evaluation_type_id
						JOIN ${studentTable} s ON e.student_id = s.student_id
					${where} 
                    ORDER BY e.evaluation_date DESC
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
	return json(result);
}

export async function POST({ request }) {
	const body = await request.json(); //new evaluation
	const result = await sequelize.transaction(async (t) => {
		try {
			await sequelize.query(
				`SELECT create_evaluation(:evaluation_type_id, :evaluation_date, :student_id, :subject_id)`,
				{
					replacements: body,
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
			return await sequelize.query(
				`SELECT * FROM ${evaluationTable} ORDER BY evaluation_id DESC LIMIT 1`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		} catch (e) {
			throw error(400, { message: e.message })
		}
	});

	return json(result[0]);
}
