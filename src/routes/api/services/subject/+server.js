import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';
import { subjectTable, yearTable } from '$lib/database/dbTables.js';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT subject_id,
                           subject_name,
                           planned_hours,
                           year
                    FROM ${subjectTable} s
                    JOIN ${yearTable} y ON y.year_id = s.year_id
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
	console.log('hello');
	const body = await request.json(); //new subject
	const result = await sequelize.transaction(async (t) => {
		try {
			await sequelize.query(`SELECT create_subject(:subject_name, :planned_hours, :year_id)`, {
				replacements: body,
				type: sequelize.QueryTypes.SELECT,
				transaction: t
			});
			return await sequelize.query(
				`SELECT * FROM ${subjectTable} ORDER BY subject_id DESC LIMIT 1`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		} catch (e) {
			console.log(e.message);
			throw error(400, { message: e.message })
		}
	});
	return json(result[0]);
}
