export const CONFIG_DATABASE = <T>(): T => ({
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PWD,
    database: process.env.DATABASE,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/infra/database/migrations/*.js'],
} as T)