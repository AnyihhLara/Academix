import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { studentsGroupTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { students_group_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT read_students_group(:students_group_id)`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { students_group_id },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Grupo de estudiantes con id ${students_group_id} no encontrado`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { students_group_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT delete_students_group(:students_group_id)`,
        {
          replacements: { students_group_id },
          type: sequelize.QueryTypes.DELETE,
          transaction: t,
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })
  return json(result)
}

export async function PUT({ params, request }) { 
  const { students_group_id } = params
  const body = await request.json() //new attribute values for students_group
  const result = await sequelize.transaction(async (t) => {
    await sequelize.query(
      `SELECT update_students_group(:students_group_id, :year_id, :group_number)`,
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
      `SELECT read_students_group(:students_group_id)`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { students_group_id },
      }
    )
  })

  if (result.length === 0)
    throw new error(404, { message: `Grupo de estudiantes con id ${students_group_id} no encontrado` })
  return json(result[0])
}