import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(`SELECT * FROM report1_students_by_group() LIMIT ${limit}`, {
				type: sequelize.QueryTypes.SELECT,
				transaction: t
			});
		})
		.catch((e) => {
			throw error(400, { message: e.message });
		});

	let dataBySchoolYear = [];
	result.forEach((row) => {
		let schoolYearObj = dataBySchoolYear.find((obj) => obj.schoolYear === row.school_year);
		if (!schoolYearObj) {
			schoolYearObj = {
				schoolYear: row.school_year,
				years: []
			};
			dataBySchoolYear.push(schoolYearObj);
		}

		let yearObj = schoolYearObj.years.find((obj) => obj.year === row.year);
		if (!yearObj) {
			yearObj = {
				year: row.year,
				studentsGroups: []
			};
			schoolYearObj.years.push(yearObj);
		}

		let groupObj = yearObj.studentsGroups.find((obj) => obj.studentsGroup === row.group_number);
		if (!groupObj) {
			groupObj = {
				studentsGroup: row.group_number,
				students: []
			};
			yearObj.studentsGroups.push(groupObj);
		}

		groupObj.students.push({
			order_number: row.order_number,
			student_name: row.student_name,
			student_lastname: row.student_lastname,
			student_code: row.student_code
		});
	});

	return json(dataBySchoolYear);
}
