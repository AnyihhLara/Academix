import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { evaluationTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { evaluation_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT * FROM ${table} WHERE evaluation_id = :evaluation_id and disable=FALSE`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { evaluation_id },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Evaluación con id ${evaluation_id} no encontrada`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { evaluation_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE evaluation_id = :evaluation_id`,
        {
          replacements: { evaluation_id },
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
  const { evaluation_id } = params
  const body = await request.json() //new attribute values for evaluation
  const result = await sequelize.transaction(async (t) => {
    await sequelize.query(
      `SELECT update_evaluation(:evaluation_id, :evaluation_name, :evaluation_type_id, :student_id, :subject_id, :evaluation_date)`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: {
          ...body,
          evaluation_id,
        },
      }
    )
    return await sequelize.query(
      `SELECT * FROM ${table} WHERE evaluation_id = :evaluation_id`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { evaluation_id },
      }
    )
  })

  if (result.length === 0)
    throw new error(404, { message: `Evaluación con id ${evaluation_id} no encontrada` })
  return json(result[0])
}