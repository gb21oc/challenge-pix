import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { CONFIG_DATABASE } from "src/common/constants";

export class DatabaseService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
        return CONFIG_DATABASE<TypeOrmModuleOptions>()
    }
}