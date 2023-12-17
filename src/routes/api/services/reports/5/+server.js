import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(`SELECT * FROM report5_evaluations_by_group() LIMIT ${limit}`, {
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
				subjects: []
			};
			schoolYearObj.years.push(yearObj);
		}

		let subjectObj = yearObj.subjects.find((obj) => obj.subject === row.subject_name);
		if (!subjectObj) {
			subjectObj = {
				subject: row.subject_name,
				studentsGroups: []
			};
			yearObj.subjects.push(subjectObj);
		}

		let groupObj = subjectObj.studentsGroups.find((obj) => obj.studentsGroup === row.group_number);
		if (!groupObj) {
			groupObj = {
				studentsGroup: row.group_number,
				evaluations: []
			};
			subjectObj.studentsGroups.push(groupObj);
		}

		groupObj.evaluations.push({
			order_number: row.order_number,
			student_name: row.student_name,
			student_lastname: row.student_lastname,
			evaluation_type_name: row.evaluation_type_name
		});
	});

	return json(dataBySchoolYear);
}
