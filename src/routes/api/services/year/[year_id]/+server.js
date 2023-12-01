import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { yearTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { year_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT read_year(:year_id)`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { year_id },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Año con id ${year_id} no encontrado`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { year_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT delete_year(:year_id)`,
        {
          replacements: { year_id },
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
  const { year_id } = params
  const body = await request.json() //new attribute values for year
  const result = await sequelize.transaction(async (t) => {
    await sequelize.query(
      `SELECT update_year(:year_id, :year, :school_year)`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: {
          ...body,
          year_id,
        },
      }
    )
    return await sequelize.query(
        `SELECT read_year(:year_id)`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { year_id },
      }
    )
  })

  if (result.length === 0)
    throw new error(404, { message: `Año con id ${year_id} no encontrado` })
  return json(result[0])
}