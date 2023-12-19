import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';
import {
	academicSituationTable,
	studentsGroupTable,
	studentTable,
	unenrollmentReasonTable,
	yearTable
} from '$lib/database/dbTables.js';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const limit = params.get('limit');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT student_id,
                           student_code,
                           student_name,
                           lastname,
                           sex,
                           municipality,
                           academic_situation_name AS academic_situation,
                           COALESCE(unenrollment_reason_name, '-') AS unenrollment_reason,
                           year,
                           group_number,
                           user_id
                    FROM ${studentTable} s
                        JOIN ${academicSituationTable} ast ON ast.academic_situation_id = s.academic_situation_id
                        LEFT JOIN ${unenrollmentReasonTable} ur ON ur.unenrollment_reason_id = s.unenrollment_reason_id
                        JOIN ${yearTable} y ON y.year_id = s.year_id
                        JOIN ${studentsGroupTable} sg ON s.group_id = sg.group_id
                    ORDER BY lastname
                    LIMIT ${limit};`,
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
	const body = await request.json(); //new student
	const result = await sequelize.transaction(async (t) => {
		try {
			await sequelize.query(
				`SELECT create_student(
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
					replacements: body,
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
			return await sequelize.query(
				`SELECT * FROM ${studentTable} ORDER BY student_id DESC LIMIT 1`,
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