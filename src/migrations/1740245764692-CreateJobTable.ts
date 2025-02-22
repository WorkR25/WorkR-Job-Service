import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateJobTable1740245764692 implements MigrationInterface {
    name = 'CreateJobTable1740245764692';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TYPE "public"."jobs_job_state_enum" AS ENUM(\'pending\', \'approved\')');
        await queryRunner.query('CREATE TYPE "public"."jobs_job_type_enum" AS ENUM(\'remote\', \'in-office\', \'hybrid\')');
        await queryRunner.query('CREATE TYPE "public"."jobs_job_category_enum" AS ENUM(\'fulltime\', \'internship\')');
        await queryRunner.query('CREATE TYPE "public"."jobs_internship_type_enum" AS ENUM(\'tech\', \'non-tech\')');
        await queryRunner.query('CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employer_id" integer NOT NULL, "job_state" "public"."jobs_job_state_enum" NOT NULL DEFAULT \'pending\', "company_name" character varying(50) NOT NULL, "company_logo" character varying, "company_about_link" character varying, "number_of_employees" character varying, "office_location" character varying(40), "job_title" character varying(30) NOT NULL, "required_skills" text array NOT NULL, "min_salary" numeric(10,1) NOT NULL, "max_salary" numeric(10,1) NOT NULL, "job_description" character varying NOT NULL, "job_type" "public"."jobs_job_type_enum" NOT NULL, "job_category" "public"."jobs_job_category_enum" NOT NULL, "internship_type" "public"."jobs_internship_type_enum", "work_experience" character varying(6), "apply_link" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updtaed_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "jobs"');
        await queryRunner.query('DROP TYPE "public"."jobs_internship_type_enum"');
        await queryRunner.query('DROP TYPE "public"."jobs_job_category_enum"');
        await queryRunner.query('DROP TYPE "public"."jobs_job_type_enum"');
        await queryRunner.query('DROP TYPE "public"."jobs_job_state_enum"');
    }

}
