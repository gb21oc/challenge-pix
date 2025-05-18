import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationName1747591906170 implements MigrationInterface {
    name = 'MigrationName1747591906170'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."pix_status_enum" AS ENUM('PENDING', 'COMPLETED', 'EXPIRED', 'CANCELLED', 'FAILED')`);
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "pix" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid, "traderId" uuid, "amount" numeric(10,2) NOT NULL, "status" "public"."pix_status_enum" NOT NULL, "paymentId" character varying NOT NULL, "qrCode" character varying NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "expires_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_da846dad51d704c2f2814148ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pix" ADD CONSTRAINT "FK_2536476872148f45c4b8d97e655" FOREIGN KEY ("userId") REFERENCES "user_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pix" ADD CONSTRAINT "FK_3c9425ad185a5f083f29cffe0bf" FOREIGN KEY ("traderId") REFERENCES "trader_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pix" DROP CONSTRAINT "FK_3c9425ad185a5f083f29cffe0bf"`);
        await queryRunner.query(`ALTER TABLE "pix" DROP CONSTRAINT "FK_2536476872148f45c4b8d97e655"`);
        await queryRunner.query(`DROP TABLE "pix"`);
        await queryRunner.query(`DROP TYPE "public"."pix_status_enum"`);
    }

}
