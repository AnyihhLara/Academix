import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { carTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { id_car } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT * FROM ${table} WHERE id_car = :identifier and disable=FALSE`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { identifier },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Car with id ${identifier} not found`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { identifier } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE id_car = :identifier`,
        {
          replacements: { identifier },
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
  const { identifier } = params
  const body = await request.json() //new attribute values for car
  const result = await sequelize.transaction(async (t) => {
    await sequelize.query(
      `SELECT update_car(:identifier,null,null,null,:id_driver)`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: {
          ...body,
          identifier,
        },
      }
    )
    return await sequelize.query(
      `SELECT * FROM ${table} WHERE id_car = :identifier`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { identifier },
      }
    )
  })

  if (result.length === 0)
    throw new error(404, { message: `Car with plate ${identifier} not found` })
  return json(result[0])
}
