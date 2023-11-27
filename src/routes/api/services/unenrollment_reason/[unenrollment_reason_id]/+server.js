import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { unenrollmentReasonTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { unenrollment_reason_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT * FROM ${table} WHERE unenrollment_reason_id = :unenrollment_reason_id and disable=FALSE`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { unenrollment_reason_id },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Causa de baja con id ${unenrollment_reason_id} no encontrada`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { unenrollment_reason_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `DELETE FROM ${table} WHERE unenrollment_reason_id = :unenrollment_reason_id`,
        {
          replacements: { unenrollment_reason_id },
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
  const { unenrollment_reason_id } = params
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
      `SELECT * FROM ${table} WHERE unenrollment_reason_id = :unenrollment_reason_id`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { unenrollment_reason_id },
      }
    )
  })

  if (result.length === 0)
    throw new error(404, { message: `Causa de baja con id ${unenrollment_reason_id} no encontrada` })
  return json(result[0])
}