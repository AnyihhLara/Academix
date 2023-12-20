import sequelize from '$lib/database/db.js';
import { error, json } from '@sveltejs/kit';

export async function GET({ url }) {
    const { searchParams: params } = url; //query parameters
    const limit = params.get('limit');
    const startDate = params.get('start_date');
    const endDate = params.get('end_date');
    const groupNumber = params.get('group_number');
    const year = params.get('year');
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT * FROM report7_failed_students_in_a_period('${startDate}', '${endDate}', ${year}, ${groupNumber} ) LIMIT ${limit}`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t
                }
            );
        })
        .catch((e) => {
            throw error(400, { message: e.message });
        });
    let data = {
        school_years: []
    };
    result.forEach((row) => {
        let schoolYearObj = data.school_years.find((obj) => obj.school_year === row.school_year);
        if (!schoolYearObj) {
            schoolYearObj = {
                school_year: row.school_year,
                year: row.year,
                group_number: row.group_number,
                failed_students: []
            };
            data.school_years.push(schoolYearObj);
        }
        schoolYearObj.failed_students.push({
            student_name: row.student_name,
            lastname: row.lastname,
            order_number: row.order_number,
            failed_subjects: row.failed_subjects
        });
    });
    return json(data);
}

