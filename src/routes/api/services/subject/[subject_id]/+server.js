import sequelize from "$lib/database/db.js";
import { error, json } from '@sveltejs/kit'

export async function GET({ params }) {
    const { subject_id } = params
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT read_subject(:subject_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: { subject_id },
                }
            )
        })
        .catch((err) => {
            throw error(400, { message: err.message })
        })

    if (result.length === 0)
        throw error(404, {
            message: `Asignatura con id ${subject_id} no encontrada`,
        })
    return json(result[0])
}

export async function DELETE({ params }) {
    const { subject_id } = params
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT delete_subject(:subject_id)`,
                {
                    replacements: { subject_id },
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
    const { subject_id } = params
    const body = await request.json() //new attribute values for subject
    try {
        const result = await sequelize.transaction(async (t) => {
            await sequelize.query(
                `SELECT update_subject(:subject_id, :subject_name, :planned_hours, :year_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {
                        ...body,
                        subject_id,
                    },
                }
            )
            return await sequelize.query(
                `SELECT read_subject(:subject_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: { subject_id },
                }
            )
        })

        if (result.length === 0)
            throw new error(404, { message: `Asignatura con id ${subject_id} no encontrada` })
        return json(result[0])
    }
    catch (e) { throw error(400, { message: e.message }) }
}