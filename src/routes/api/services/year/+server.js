import sequelize from '$lib/database/db.js'
import { error, json } from '@sveltejs/kit'
import { yearTable as table } from '$lib/database/dbTables.js'

export async function GET({ url }) {
    const { searchParams: params } = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(`SELECT * FROM ${table} LIMIT ${limit}`, {
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
    const body = await request.json() //new year
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT create_year(:year, :school_year)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            return await sequelize.query(
                `SELECT * FROM ${table} ORDER BY year_id DESC LIMIT 1`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
        } catch (e) {
            throw error(400, { message: e.message })
        }
    })
    return json(result[0])
}