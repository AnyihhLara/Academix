import sequelize from "$lib/database/db.js";
import { error, json } from '@sveltejs/kit'

export async function GET({ params }) {
    let { academic_situation_id } = params;
    academic_situation_id = Number(academic_situation_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT read_academic_situation(:academic_situation_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: { academic_situation_id },
                }
            )
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })

    if (result.length === 0)
        throw error(404, {
            message: `Situación Académica con id ${academic_situation_id} no encontrada`,
        })
    return json(result[0])
}

export async function DELETE({ params }) {
    const { academic_situation_id } = params
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT delete_academic_situation(:academic_situation_id)`,
                {
                    replacements: { academic_situation_id },
                    type: sequelize.QueryTypes.DELETE,
                    transaction: t,
                }
            )
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })
    return json(result)
}

export async function PUT({ params, request }) {
    let { academic_situation_id } = params;
    academic_situation_id = Number(academic_situation_id);
    const body = await request.json() //new attribute values for academic_situation
    try {
        const result = await sequelize.transaction(async (t) => {
            await sequelize.query(
                `SELECT update_academic_situation(:academic_situation_id, :academic_situation_name)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {
                        ...body,
                        academic_situation_id,
                    },
                }
            )
            return await sequelize.query(
                `SELECT read_academic_situation(:academic_situation_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: { academic_situation_id },
                }
            )
        })

        if (result.length === 0)
            throw new error(404, { message: `Situación Académica con id ${academic_situation_id} no encontrada` })
        return json(result[0])
    }
    catch (e) { throw error(400, { message: e.message }) }
}