import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1746292463299 implements MigrationInterface {
    name = 'MigrationName1746292463299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "trader_entity" ("cnpj" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "PK_fe70a4d2518aba14c35f21af798" PRIMARY KEY ("cnpj", "email"))`);
        await queryRunner.query(`CREATE TABLE "user_entity" ("cpf" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "PK_ba31db9e169cc18a00dc2152153" PRIMARY KEY ("cpf", "email"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_entity"`);
        await queryRunner.query(`DROP TABLE "trader_entity"`);
    }

}
