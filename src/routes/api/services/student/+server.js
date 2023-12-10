import sequelize from '$lib/database/db.js'
import {error, json} from '@sveltejs/kit'
import {studentTable as table} from '$lib/database/dbTables.js'

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT * 
                    FROM ${table}
                    LIMIT ${limit}`,
                {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            });
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })
    return json(result)
}

export async function POST({ request }) {
    const body = await request.json() //new student
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT create_student(:student_name, :student_lastname, :student_sex, :municipality,  :student_code, :academic_situation_id, :group_id, :year_id, :unenrollment_reason_id)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            return await sequelize.query(
                `SELECT * FROM ${table} ORDER BY student_id DESC LIMIT 1`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
        } catch (e) {
            throw error(400, e)
        }
    })
    return json(result[0])
}