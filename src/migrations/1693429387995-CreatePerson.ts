import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePerson1693429387995 implements MigrationInterface {
    name = 'CreatePerson1693429387995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_schema"."person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL DEFAULT '', "email" character varying NOT NULL DEFAULT '', "phone" character varying NOT NULL DEFAULT '', "birth_date" date, "document_number" character varying DEFAULT '', CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "project_schema"."person"`);
    }

}
