import sequelize from "$lib/database/db.js";
import {error, json} from '@sveltejs/kit'

export async function GET({params}) {
    let {evaluation_type_id} = params;
    evaluation_type_id = Number(evaluation_type_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT read_evaluation_type(:evaluation_type_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {evaluation_type_id},
                }
            )
        })
        .catch((err) => {
            throw error(400, {message: err.message})
        })

    if (result.length === 0)
        throw error(404, {
            message: `Tipo de evaluación con id ${evaluation_type_id} no encontrada`,
        })

    let strValue = result[0].read_evaluation_type;
    const values = strValue.slice(1, -1).split(',');
    const obj = {
        evaluation_type_id: Number(values[0]),
        evaluation_type_name: values[1],
        evaluation_numerical_value: Number(values[2])
    };

    return json(obj)
}

export async function DELETE({params}) {
    const {evaluation_type_id} = params
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT delete_evaluation_type(:evaluation_type_id)`,
                {
                    replacements: {evaluation_type_id},
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
    let {evaluation_type_id} = params;
    evaluation_type_id = Number(evaluation_type_id);
    const body = await request.json() //new attribute values for evaluation_type
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `SELECT update_evaluation_type(:evaluation_type_id, :evaluation_type_name, :evaluation_numerical_value)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    ...body,
                    evaluation_type_id,
                },
            }
        )
        return await sequelize.query(
            `SELECT read_evaluation_type(:evaluation_type_id)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {evaluation_type_id},
            }
        )
    })

    if (result.length === 0)
        throw new error(404, {message: `Tipo de evaluación con id ${evaluation_type_id} no encontrada`})
    return json(result[0])
}