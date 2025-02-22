import { DeepPartial } from 'typeorm';

import Job from '../models/Job';
import { QueryFilter } from '../types/QueryFilter';
import { JOB_CATEGORY } from '../utils/enums/JobCategory';
import { JOB_STATE } from '../utils/enums/JobState';
import CrudRepository from './CrudRepository';

class JobRepository extends CrudRepository {
    constructor() {
        super(Job);
    }

    async updateJobState(id: string, data: DeepPartial<Job>) {
        await Job.update(id, data);
    }

    async getAllFulltimeJobs() {
        const jobs = await Job.find({
            where: {
                jobCategory: JOB_CATEGORY.FULLTIME,
                jobState: JOB_STATE.APPROVED
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return jobs;
    }

    async getAllInternshipJobs() {
        const jobs = await Job.find({
            where: {
                jobCategory: JOB_CATEGORY.INTERNSHIP,
                jobState: JOB_STATE.APPROVED
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return jobs;
    }

    async getAllFulltimeJobsByEmployerId(employerId: number) {
        const jobs = await Job.find({
            where: {
                employerId,
                jobCategory: JOB_CATEGORY.FULLTIME
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return jobs;
    }

    async getAllInternshipJobsByEmployerId(employerId: number) {
        const jobs = await Job.find({
            where: {
                employerId,
                jobCategory: JOB_CATEGORY.INTERNSHIP
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return jobs;
    }

    async getAllPendingJobs() {
        const jobs = await Job.find({
            where: {
                jobState: JOB_STATE.PENDING
            },
            order: {
                createdAt: 'DESC'
            }
        });

        return jobs;
    }

    async getAllFulltimeJobsByFilter(filter: QueryFilter) {
        const jobs = await Job.find({
            where: {
                ...filter,
                jobState: JOB_STATE.APPROVED,
                jobCategory: JOB_CATEGORY.FULLTIME
            },
            order: {
                createdAt: 'DESC'
            }
        });

        return jobs;
    }

    async getAllInternshipJobsByFilter(filter: QueryFilter) {
        const jobs = await Job.find({
            where: {
                ...filter,
                jobState: JOB_STATE.APPROVED,
                jobCategory: JOB_CATEGORY.INTERNSHIP
            },
            order: {
                createdAt: 'DESC'
            }
        });

        return jobs;
    }
}

export default JobRepository;