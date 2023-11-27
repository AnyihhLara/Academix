import { Sequelize } from 'sequelize';
import { env } from '$env/dynamic/private';

const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
    host: env.DB_HOST,
    dialect: 'postgres',
    logging: (sql, timing) => {
        console.log(sql.split('): ')[1], '\n')
    },
})
export default sequelize;
