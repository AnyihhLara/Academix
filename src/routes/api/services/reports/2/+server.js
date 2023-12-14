import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(`SELECT * FROM report2_subjects_by_year() LIMIT ${limit}`, {
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

		yearObj.subjects.push({
			subject_name: row.subject_name,
			planned_hours: row.planned_hours
		});
	});

	return json(dataBySchoolYear);
}
