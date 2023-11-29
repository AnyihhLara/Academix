import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { academicSituationTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { academic_situation_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT read_academic_situation(:academic_situation_id)`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { academic_situation_id },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Situación Académica con id ${academic_situation_id} no encontrada`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { academic_situation_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT delete_academic_situation(:academic_situation_id)`,
        {
          replacements: { academic_situation_id },
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
  const { academic_situation_id } = params
  const body = await request.json() //new attribute values for academic_situation
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