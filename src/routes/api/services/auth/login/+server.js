import sequelize from '$lib/database/db.js'
import {json, error} from '@sveltejs/kit'
import {usersTable as table} from '$lib/database/dbTables.js'

export async function POST({request, cookies}) {
    const body = await request.json()
    const {username, password} = body

    const result = await sequelize
        .transaction(async (t) => {
            const s = await sequelize.query(
                `
            SELECT u.*
            FROM ${table} u
            WHERE u.user_name = :username`,
                {
                    transaction: t,
                    type: sequelize.QueryTypes.SELECT,
                    replacements: {username},
                }
            )

            if (s.length === 0) throw new Error('Usuario incorrecto o no autorizado')
            if (s[0].user_password !== password) throw new Error('Contraseña incorrecta')
            const login = {
                id_user: s[0].user_id,
                username: s[0].user_name,
                id_role: s[0].role_id
            }
            cookies.set('academix-user', username, getCookieSettings())
            cookies.set('academix-pass', password, getCookieSettings())

            return login
        })
        .catch((e) => {
            console.log(e.message)
            throw error(401, {message: e.message})
        })
    return json(result)
    // TODO: Encryption!!!
}

const getCookieSettings = (opts) => ({
    httpOnly: true,
    path: '/',
    sameSite: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    ...opts
})