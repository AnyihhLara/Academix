import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { evaluationTypeTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { evaluation_type_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT * FROM ${table} WHERE evaluation_type_id = :evaluation_type_id and disable=FALSE`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { evaluation_type_id },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Tipo de evaluación con id ${evaluation_type_id} no encontrada`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { evaluation_type_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE evaluation_type_id = :evaluation_type_id`,
        {
          replacements: { evaluation_type_id },
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
  const { evaluation_type_id } = params
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
      `SELECT * FROM ${table} WHERE evaluation_type_id = :evaluation_type_id`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { evaluation_type_id },
      }
    )
  })

  if (result.length === 0)
    throw new error(404, { message: `Tipo de evaluación con id ${evaluation_type_id} no encontrada` })
  return json(result[0])
}