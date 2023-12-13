import sequelize from '$lib/database/db.js';
import {
	academicSituationTable,
	studentsGroupTable,
	studentTable,
	unenrollmentReasonTable,
	yearTable
} from '$lib/database/dbTables.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
	const { searchParams: params } = url; //query parameters
	const user_id = params.get('user_id');
	const result = await sequelize
		.transaction(async (t) => {
			return await sequelize.query(
				`SELECT s.student_id,
                           s.student_code,
                           s.student_name,
                           s.lastname,
                           s.sex,
                           s.municipality,
                           s.user_id,
                           y.year,
                           sg.group_number,
                           sit.academic_situation_name as academic_situation,
                           ur.unenrollment_reason_name as unenrollment_reason
                    FROM ${studentTable} s
                        JOIN ${yearTable} y ON y.year_id = s.year_id
                        JOIN ${studentsGroupTable} sg ON s.group_id = sg.group_id
                        JOIN ${academicSituationTable} sit ON sit.academic_situation_id = s.academic_situation_id
                        LEFT JOIN ${unenrollmentReasonTable} ur ON ur.unenrollment_reason_id = s.unenrollment_reason_id
                    WHERE s.user_id = ${user_id}`,
				{
					type: sequelize.QueryTypes.SELECT,
					transaction: t
				}
			);
		})
		.catch((err) => {
			throw error(400, { message: err.message });
		});

	if (result.length === 0)
		throw error(404, {
			message: `Estudiante con el id de usuario ${user_id} no encontrado`
		});
	return json(result[0]);
}
