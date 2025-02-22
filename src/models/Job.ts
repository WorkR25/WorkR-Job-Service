import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { INTERNSHIP_TYPE } from '../utils/enums/InternshipType';
import { JOB_CATEGORY } from '../utils/enums/JobCategory';
import { JOB_STATE } from '../utils/enums/JobState';
import { JOB_TYPE } from '../utils/enums/JobType';

@Entity({ name: 'jobs' })
class Job extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
        id: string;

    @Column({ name: 'employer_id' })
        employerId: number;

    @Column({ name: 'job_state', type: 'enum', enum: JOB_STATE, default: JOB_STATE.PENDING })
        jobState: JOB_STATE;

    @Column({ name: 'company_name', length: 50 })
        companyName: string;

    @Column({ name: 'company_logo', nullable: true })
        companyLogo: string;

    @Column({ name: 'company_about_link', nullable: true })
        companyAbout: string;

    @Column({ name: 'number_of_employees', nullable: true })
        numberOfEmployees: string;

    @Column({ name: 'office_location', length: 40, nullable: true })
        officeLocation: string;

    @Column({ name: 'job_title', length: 30 })
        jobTitle: string;

    @Column({ name: 'required_skills', type: 'text', array: true })
        requiredSkills: string[];

    @Column({ name: 'min_salary', type: 'numeric', precision: 10, scale: 1 })
        minSalary: number;

    @Column({ name: 'max_salary', type: 'numeric', precision: 10, scale: 1 })
        maxSalary: number;

    @Column({ name: 'job_description' })
        jobDescription: string;

    @Column({ name: 'job_type', type: 'enum', enum: JOB_TYPE })
        jobType: JOB_TYPE;

    @Column({ name: 'job_category', type: 'enum', enum: JOB_CATEGORY })
        jobCategory: JOB_CATEGORY;

    @Column({ name: 'internship_type', type: 'enum', enum: INTERNSHIP_TYPE, nullable: true })
        internshipType: INTERNSHIP_TYPE;

    @Column({ name: 'work_experience', length: 6, nullable: true })
        workExperience: string;

    @Column({ name: 'apply_link', nullable: true })
        applyLink: string;

    @CreateDateColumn({ name: 'created_at' })
        createdAt: Date;

    @UpdateDateColumn({ name: 'updtaed_at' })
        updatedAt: Date;
}

export default Job;