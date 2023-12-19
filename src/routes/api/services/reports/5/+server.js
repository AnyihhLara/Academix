import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const groupNumber = params.get('group_number');
	console.log(groupNumber)
	const year = params.get('year');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT * FROM report5_academic_ladder(${year}, ${groupNumber} ) LIMIT ${limit}`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		})
		.catch((e) => {
			throw error(400, { message: e.message });
		});
	let data = {};
	data.students = [];
	result.forEach((row) => {
		data.school_year = row.school_year,
			data.year = row.year,
			data.group_number = row.group_number;

		data.students = [...data.students, {
			rank: row.rank,
			student_name: row.student_name,
			lastname: row.student_lastname,
			average: row.average,
			order_number: row.order_number,
			sex: row.sex,
			municipality: row.municipality
		}];
	});
	return json(data);
}

