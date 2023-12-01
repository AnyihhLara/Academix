import sequelize from '$lib/db'
import { error, json } from '@sveltejs/kit'
import { studentTable as table } from '$lib/database/dbTables.js'
export async function GET({ params }) {
  const { student_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      let result = await sequelize.query(
        `SELECT read_student(:student_id)`,
        {
          type: sequelize.QueryTypes.SELECT,
          transaction: t,
          replacements: { student_id },
        }
      )
      return result
    })
    .catch((err) => {
      throw error(400, { message: err.message })
    })

  if (result.length == 0)
    throw error(404, {
      message: `Estudiante con id ${student_id} no encontrado`,
    })
  return json(result[0])
}

export async function DELETE({ params }) {
  const { student_id } = params
  const result = await sequelize
    .transaction(async (t) => {
      const result = await sequelize.query(
        `SELECT delete_student(:student_id)`,
        {
          replacements: { student_id },
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
  const { student_id } = params
  const body = await request.json() //new attribute values for student
  const result = await sequelize.transaction(async (t) => {
    await sequelize.query(
      `SELECT update_student(:student_id, :student_name, :student_lastname, :student_sex, :municipality,  :student_code, :academic_situation_id, :group_id, :year_id, :unenrollment_reason_id)`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: {
          ...body,
          student_id,
        },
      }
    )
    return await sequelize.query(
        `SELECT read_student(:student_id)`,
      {
        type: sequelize.QueryTypes.SELECT,
        transaction: t,
        replacements: { student_id },
      }
    )
  })

  if (result.length === 0)
    throw new error(404, { message: `Estudiante con id ${student_id} no encontrado` })
  return json(result[0])
}