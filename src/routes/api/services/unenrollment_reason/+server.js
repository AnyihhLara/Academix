import sequelize from '$lib/database/db.js'
import { error, json } from '@sveltejs/kit'
import { unenrollmentReasonTable as table } from '$lib/database/dbTables.js'

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize
        .transaction(async (t) => {
            const result = await sequelize.query(`SELECT * FROM unenrollment_reason_view LIMIT ${limit}`, {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
            })

            return result;
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })
    return json(result)
}

export async function POST({ request }) {
    const body = await request.json() //new unenrollment_reason
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT create_unenrollment_reason(:unenrollment_reason_name)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            return await sequelize.query(
                `SELECT * FROM ${table} ORDER BY unenrollment_reason_id DESC LIMIT 1`,
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