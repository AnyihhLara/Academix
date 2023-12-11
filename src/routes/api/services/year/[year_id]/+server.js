import sequelize from "$lib/database/db.js";
import {error, json} from '@sveltejs/kit'

export async function GET({params}) {
    let {year_id} = params;
    year_id = Number(year_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT read_year(:year_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {year_id},
                }
            )
        })
        .catch((err) => {
            throw error(400, {message: err.message})
        })

    if (result.length === 0)
        throw error(404, {
            message: `Año con id ${year_id} no encontrado`,
        })
    return json(result[0])
}

export async function DELETE({params}) {
    let {year_id} = params;
    year_id = Number(year_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT delete_year(:year_id)`,
                {
                    replacements: {year_id},
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
    let {year_id} = params;
    year_id = Number(year_id);
    const body = await request.json() //new attribute values for year
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `SELECT update_year(:year_id, :year, :school_year)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    ...body,
                    year_id,
                },
            }
        )
        return await sequelize.query(
            `SELECT read_year(:year_id)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {year_id},
            }
        )
    })

    if (result.length === 0)
        throw new error(404, {message: `Año con id ${year_id} no encontrado`})
    return json(result[0])
}