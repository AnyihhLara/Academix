import sequelize from '$lib/database/db.js'
import {error, json} from '@sveltejs/kit'
import {usersTable, rolesTable} from '$lib/database/dbTables.js'

export async function GET({url}) {
    const {searchParams: params} = url //query parameters
    const limit = params.get('limit')
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT user_id, user_name, user_password, role_name
                    FROM ${usersTable} ut
                    JOIN ${rolesTable} rt ON rt.role_id = ut.role_id 
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
    const body = await request.json() //new user
    const result = await sequelize.transaction(async (t) => {
        try {
            await sequelize.query(
                `SELECT create_users(:user_name, :user_password, :role_id)`,
                {
                    replacements: body,
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                }
            )
            return await sequelize.query(
                `SELECT * 
                    FROM ${usersTable} 
                    ORDER BY user_id DESC 
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