import sequelize from "$lib/database/db.js";
import {error, json} from '@sveltejs/kit'

export async function GET({params}) {
    let {unenrollment_reason_id} = params
    unenrollment_reason_id = Number(unenrollment_reason_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT read_unenrollment_reason(:unenrollment_reason_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {unenrollment_reason_id},
                }
            )
        })
        .catch((err) => {
            throw error(400, {message: err.message})
        })

    if (result.length === 0)
        throw error(404, {
            message: `Causa de baja con id ${unenrollment_reason_id} no encontrada`,
        })
    return json(result[0])
}

export async function DELETE({params}) {
    let {unenrollment_reason_id} = params
    unenrollment_reason_id = Number(unenrollment_reason_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT delete_unenrollment_reason(:unenrollment_reason_id)`,
                {
                    replacements: {unenrollment_reason_id},
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
    let {unenrollment_reason_id} = params
    unenrollment_reason_id = Number(unenrollment_reason_id);
    const body = await request.json() //new attribute values for unenrollment_reason
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `SELECT update_unenrollment_reason(:unenrollment_reason_id, :unenrollment_reason_name)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    ...body,
                    unenrollment_reason_id,
                },
            }
        )
        return await sequelize.query(
            `SELECT read_unenrollment_reason(:unenrollment_reason_id)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {unenrollment_reason_id},
            }
        )
    })

    if (result.length === 0)
        throw new error(404, {message: `Causa de baja con id ${unenrollment_reason_id} no encontrada`})
    return json(result[0])
}