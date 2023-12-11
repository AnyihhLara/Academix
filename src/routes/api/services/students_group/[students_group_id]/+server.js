import sequelize from "$lib/database/db.js";
import {error, json} from '@sveltejs/kit'

export async function GET({params}) {
    let {group_id} = params;
    group_id = Number(group_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT read_students_group(:group_id)`,
                {
                    type: sequelize.QueryTypes.SELECT,
                    transaction: t,
                    replacements: {group_id},
                }
            )
        })
        .catch((err) => {
            throw error(400, {message: err.message})
        })

    if (result.length === 0)
        throw error(404, {
            message: `Grupo de estudiantes con id ${group_id} no encontrado`,
        })
    return json(result[0])
}

export async function DELETE({params}) {
    let {students_group_id} = params;
    let [year_id, group_id] = students_group_id.split('-');
    year_id = Number(year_id);
    group_id = Number(group_id);
    const result = await sequelize
        .transaction(async (t) => {
            return await sequelize.query(
                `SELECT delete_students_group(:year_id, :group_id)`,
                {
                    replacements: {
                        year_id,
                        group_id
                    },
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
    let {students_group_id} = params;
    students_group_id = Number(students_group_id);
    const body = await request.json() //new attribute values for students_group
    const result = await sequelize.transaction(async (t) => {
        await sequelize.query(
            `SELECT update_students_group(:year_id, :students_group_id, :group_number)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    ...body,
                    students_group_id,
                },
            }
        )
        return await sequelize.query(
            `SELECT read_students_group(:students_group_id, :year_id)`,
            {
                type: sequelize.QueryTypes.SELECT,
                transaction: t,
                replacements: {
                    ...body,
                    students_group_id
                },
            }
        )
    })

    if (result.length === 0)
        throw new error(404, {message: `Grupo de estudiantes con id ${students_group_id} no encontrado`})
    return json(result[0])
}