import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1709913600000 implements MigrationInterface {
    name = 'CreateInitialTables1709913600000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create enum type for gender
        await queryRunner.query(`CREATE TYPE "public"."student_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);

        // Create student table
        await queryRunner.query(`
            CREATE TABLE "student" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "first_name" character varying NOT NULL,
                "last_name" character varying NOT NULL,
                "email" character varying NOT NULL,
                "date_of_birth" date NOT NULL,
                "gender" "public"."student_gender_enum" NOT NULL DEFAULT 'OTHER',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_student_email" UNIQUE ("email"),
                CONSTRAINT "PK_student" PRIMARY KEY ("id")
            )
        `);

        // Create subject table
        await queryRunner.query(`
            CREATE TABLE "subject" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "code" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_subject_code" UNIQUE ("code"),
                CONSTRAINT "PK_subject" PRIMARY KEY ("id")
            )
        `);

        // Create mark table
        await queryRunner.query(`
            CREATE TABLE "mark" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "student_id" uuid NOT NULL,
                "subject_id" uuid NOT NULL,
                "score" decimal(5,2) NOT NULL,
                "semester" integer NOT NULL,
                "academic_year" character varying NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_mark" PRIMARY KEY ("id"),
                CONSTRAINT "FK_mark_student" FOREIGN KEY ("student_id") REFERENCES "student"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_mark_subject" FOREIGN KEY ("subject_id") REFERENCES "subject"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "mark"`);
        await queryRunner.query(`DROP TABLE "subject"`);
        await queryRunner.query(`DROP TABLE "student"`);
        await queryRunner.query(`DROP TYPE "public"."student_gender_enum"`);
    }
} 