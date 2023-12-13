import sequelize from "$lib/database/db.js";
import {error, json} from '@sveltejs/kit'

export async function GET({params}) {
    let {user_id} = params;
    user_id = Number(user_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT read_user(:user_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {user_id},
                }
            )
        })
        .catch((err) => {
            throw error(400, {message: err.message})
        })

    if (result.length === 0)
        throw error(404, {
            message: `Usuario con id ${user_id} no encontrado`,
        })
    return json(result[0])
}

export async function DELETE({params}) {
    let {user_id} = params;
    user_id = Number(user_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT delete_user(:user_id)`,
                {
                    replacements: {user_id},
                    type: sequelize.QueryTypes.DELETE,
                    transaction: t,
                }
            )
        })
        .catch((err) => {
            throw error(400, {message: err.message})
        })
    return json(result)
}

export async function PUT({params, request}) {
    let {user_id} = params;
    user_id = Number(user_id);
    const body = await request.json() //new attribute values for user
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `SELECT update_user(:user_id, :user_name, :user_password, :role_id)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    ...body,
                    user_id,
                },
            }
        )
        return await sequelize.query(
            `SELECT read_user(:user_id)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    ...body,
                    user_id
                },
            }
        )
    })

    if (result.length === 0)
        throw new error(404, {message: `Usuario con id ${user_id} no encontrado`})
    return json(result[0])
}