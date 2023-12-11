import sequelize from '$lib/database/db.js'
import {error, json} from '@sveltejs/kit'
import {studentsGroupTable, yearTable} from '$lib/database/dbTables.js'

export async function GET({url}) {
    const {searchParams: params} = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT group_id, group_number, sg.year_id, year
                    FROM ${studentsGroupTable} sg
                    JOIN ${yearTable} y ON y.year_id = sg.year_id 
                    LIMIT ${limit}`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                });
        })
        .catch((err) => {
            throw error(400, {message: err.message})
        })
    return json(result)
}

export async function POST({request}) {
    const body = await request.json() //new students_group
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT create_students_group(:year_id, :group_number)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            return await sequelize.query(
                `SELECT * 
                    FROM ${studentsGroupTable} 
                    ORDER BY group_id DESC 
                    LIMIT 1`,
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