import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const CONFIG_DATABASE = () => ({
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PWD,
    database: process.env.DATABASE,
    entities: [],
    synchronize: true,
} as TypeOrmModuleOptions)