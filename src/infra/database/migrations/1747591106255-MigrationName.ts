import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1747591106255 implements MigrationInterface {
    name = 'MigrationName1747591106255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user_entity" ("id" uuid NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "UQ_acf4a7e63bea9fd1301174089c4" UNIQUE ("cpf"), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "trader_entity" ("id" uuid NOT NULL, "cnpj" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "UQ_4b3033ce0ecd3c3fcbfc2b87cdc" UNIQUE ("cnpj"), CONSTRAINT "UQ_d2690932542807af93030b87819" UNIQUE ("email"), CONSTRAINT "PK_1c4dee3154f5077e1cc1ecebdb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."wallet_type_enum" AS ENUM('USER', 'TRADER')`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "wallet" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "traderId" uuid, "balance" numeric(10,2) NOT NULL DEFAULT '100', "type" "public"."wallet_type_enum" NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_34b7985d03a864f0e6d60e89e65" FOREIGN KEY ("traderId") REFERENCES "trader_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_34b7985d03a864f0e6d60e89e65"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TYPE "public"."wallet_type_enum"`);
        await queryRunner.query(`DROP TABLE "trader_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
