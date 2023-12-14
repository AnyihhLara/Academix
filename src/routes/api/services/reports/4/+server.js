import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const average_type = params.get('average_type');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT * FROM report4_final_averages_by_group('${average_type}') LIMIT ${limit}`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		})
		.catch((e) => {
			throw error(400, { message: e.message });
		});

	let dataByGroup = [];
	result.forEach((row) => {
		let yearObj = dataByGroup.find((obj) => obj.year === row.year);
		if (!yearObj) {
			yearObj = {
				year: row.year,
				groups: []
			};
			dataByGroup.push(yearObj);
		}

		let groupObj = yearObj.groups.find((obj) => obj.groupNumber === row.group_number);
		if (!groupObj) {
			groupObj = {
				groupNumber: row.group_number,
				students: []
			};
			yearObj.groups.push(groupObj);
		}

		groupObj.students.push({
			student_order: row.student_order,
			student_name: row.student_name,
			student_lastname: row.student_lastname,
			average: row.average
		});
	});

	return json(dataByGroup);
}
