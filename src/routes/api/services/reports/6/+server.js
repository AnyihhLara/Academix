import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const student_code = params.get('student_code');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT * FROM report6_certification_of_notes('${student_code}') LIMIT ${limit}`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		})
		.catch((e) => {
			throw error(400, { message: e.message });
		});

	let student;
	if (result.length > 0) {
		let years = [];
		result.forEach((row) => {
			let yearObj = years.find((obj) => obj.year === row.year);
			if (!yearObj) {
				yearObj = {
					year: row.year,
					school_year: row.school_year,
					subjects: []
				};
				years.push(yearObj);
			}

			yearObj.subjects.push({
				subject_name: row.subject_name,
				grade: row.grade,
				average: row.average
			});
		});

		student = {
			student_code: student_code,
			student_name: result[0].student_name,
			student_lastname: result[0].student_lastname,
			years: years
		};
	} else {
		student = null;
	}

	return json(student);
}
