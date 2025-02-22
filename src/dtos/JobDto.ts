import { z } from 'zod';

import { INTERNSHIP_TYPE } from '../utils/enums/InternshipType';
import { JOB_CATEGORY } from '../utils/enums/JobCategory';
import { JOB_TYPE } from '../utils/enums/JobType';

export const createJobZodSchema = z.object({
    employerId: z.number(),
    jobTitle: z.string(),
    requiredSkills: z.array(z.string()),
    minSalary: z.number(),
    maxSalary: z.number(),
    jobDescription: z.string(),
    jobType: z.nativeEnum(JOB_TYPE),
    jobCategory: z.nativeEnum(JOB_CATEGORY),
    internshipType: z.nativeEnum(INTERNSHIP_TYPE).optional(),
    workExperience: z.string().optional(),
    companyName: z.string(),
    companyLogo: z.string().optional(),
    companyAbout: z.string().optional(),
    numberOfEmployees: z.string().optional(),
    officeLocation: z.string().optional(),
    applyLink: z.string().optional()
});

export const updateJobZodSchema = z.object({
    jobTitle: z.string().optional(),
    requiredSkills: z.array(z.string()).optional(),
    minSalary: z.number().optional(),
    maxSalary: z.number().optional(),
    jobDescription: z.string().optional(),
    jobType: z.nativeEnum(JOB_TYPE).optional(),
    internshipType: z.nativeEnum(INTERNSHIP_TYPE).optional(),
    workExperience: z.string().optional(),
    comapnyName: z.string().optional(),
    companyLogo: z.string().optional(),
    companyAbout: z.string().optional(),
    numberOfEmployees: z.string().optional(),
    officeLocation: z.string().optional(),
    applyLink: z.string().optional()
});

export const approveJobZodSchema = z.object({
    jobId: z.string(),
    userId: z.number()
});

export const jobIdZodSchema = z.object({
    id: z.string()
});

export const userIdZodSchema = z.object({
    userId: z.number()
});

export const createFilterZodSchema = z.object({
    jobType: z.nativeEnum(JOB_TYPE).optional(),
    workExperience: z.string().optional(),
    jobTitle: z.string().optional(),
    minSalary: z.string().optional(),
    internshipType: z.nativeEnum(INTERNSHIP_TYPE).optional()
});

export type CreateJobDto = z.infer<typeof createJobZodSchema>

export type UpdateJobDto = z.infer<typeof updateJobZodSchema>

export type ApproveJobDto = z.infer<typeof approveJobZodSchema>

export type JobIdDto = z.infer<typeof jobIdZodSchema>

export type UserIdDto = z.infer<typeof userIdZodSchema>

export type CreateFilterDto = z.infer<typeof createFilterZodSchema>