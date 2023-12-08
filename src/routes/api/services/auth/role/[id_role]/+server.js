import sequelize from "$lib/database/db.js";
import {json, error} from '@sveltejs/kit'
import {rolesTable as table} from '$lib/database/dbTables.js'

export async function GET({params}) {
    const {id_role} = params //query parameters
    // const result = await sequelize
    //   .transaction(async (t) => {
    //     return await sequelize.query(
    //       `
    //           SELECT r.role_name
    //           FROM ${table} r
    //           WHERE r.id_role=:id_role`,
    //       {
    //         type: sequelize.QueryTypes.SELECT,
    //         transaction: t,
    //         replacements: { id_role },
    //       }
    //     )
    //   })
    //   .catch((err) => {
    //     throw error(400, { message: err.message })
    //   })

    // const roleName = result[0].role_name;
    const role_name = 'teacher';

    return json(role_name);
}
