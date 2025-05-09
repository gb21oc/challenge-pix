import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1746818084564 implements MigrationInterface {
    name = 'MigrationName1746818084564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "user_entity" ("id" uuid NOT NULL, "cpf" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "UQ_acf4a7e63bea9fd1301174089c4" UNIQUE ("cpf"), CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "trader_entity" ("id" uuid NOT NULL, "cnpj" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "fullName" character varying NOT NULL, CONSTRAINT "UQ_4b3033ce0ecd3c3fcbfc2b87cdc" UNIQUE ("cnpj"), CONSTRAINT "UQ_d2690932542807af93030b87819" UNIQUE ("email"), CONSTRAINT "PK_1c4dee3154f5077e1cc1ecebdb2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "pix" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "traderId" uuid, "balance" numeric(10,2) NOT NULL DEFAULT '100', "type" "public"."pix_type_enum" NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, CONSTRAINT "PK_da846dad51d704c2f2814148ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pix" ADD CONSTRAINT "FK_2536476872148f45c4b8d97e655" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pix" ADD CONSTRAINT "FK_3c9425ad185a5f083f29cffe0bf" FOREIGN KEY ("traderId") REFERENCES "trader_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pix" DROP CONSTRAINT "FK_3c9425ad185a5f083f29cffe0bf"`);
        await queryRunner.query(`ALTER TABLE "pix" DROP CONSTRAINT "FK_2536476872148f45c4b8d97e655"`);
        await queryRunner.query(`DROP TABLE "pix"`);
        await queryRunner.query(`DROP TABLE "trader_entity"`);
        await queryRunner.query(`DROP TABLE "user_entity"`);
    }

}
