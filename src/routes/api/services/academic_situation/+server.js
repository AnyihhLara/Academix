import sequelize from '$lib/database/db.js'
import { error, json } from '@sveltejs/kit'
import { academicSituationTable as table } from '$lib/database/dbTables.js'

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize
        .transaction(async (t) => {
            const result = await sequelize.query(`SELECT * FROM academic_situation_view LIMIT ${limit}`, {
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
    const body = await request.json() //new academic_situation
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT create_academic_situation(:academic_situation_name)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            return await sequelize.query(
                `SELECT * FROM ${table} ORDER BY academic_situation_id DESC LIMIT 1`,
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