import axios, { AxiosResponse } from 'axios';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { Between, ILike, Like } from 'typeorm';

import { CreateFilterDto, CreateJobDto, UpdateJobDto } from '../dtos/JobDto';
import BadRequestError from '../errors/BadRequestError';
import BaseError from '../errors/BaseError';
import InternalServerError from '../errors/InternalServerError';
import UnauthorizedError from '../errors/UnauthorizeError';
import JobRepository from '../repositories/JobRepository';
import { QueryFilter } from '../types/QueryFilter';
import { User } from '../types/User';
import auth from '../utils/common/auth';
import { INTERNSHIP_TYPE } from '../utils/enums/InternshipType';
import { JOB_STATE } from '../utils/enums/JobState';
import { JOB_TYPE } from '../utils/enums/JobType';
import { USER_ROLE } from '../utils/enums/UserRole';
import { USER_TYPE } from '../utils/enums/UserType';

class JobService {
    private jobRepository;

    constructor(jobRepository: JobRepository) {
        this.jobRepository = jobRepository;
    }

    async createJob(data: CreateJobDto) {
        try {
            const job = await this.jobRepository.create(data);
            return job;
        } catch (error) {
            throw new InternalServerError('Can not create the job', error);
        }
    }

    async getAllFulltimeJobs() {
        try {
            const jobs = await this.jobRepository.getAllFulltimeJobs();
            return jobs;
        } catch (error) {
            throw new InternalServerError('Can not fetch jobs', error);
        }
    }

    async getAllInternshipJobs() {
        try {
            const jobs = await this.jobRepository.getAllInternshipJobs();
            return jobs;
        } catch (error) {
            throw new InternalServerError('Can not fetch jobs', error);
        }
    }

    async getAllFulltimeJobsByEmployerId(employerId: number, token: string) {
        try {
            const user: AxiosResponse<User> = await axios.get(`http://localhost:4000/api/v1/users/${employerId}`, {
                headers: {
                    'x-access-token': token
                }
            });

            if(!user) {
                throw new BadRequestError('user not found', { user });
            }

            const userType = user.data.data.userType;
            if(userType != USER_TYPE.EMPLOYER) {
                throw new BadRequestError('User is not an employer, cam not show created jobs', { expected: USER_TYPE.EMPLOYER, provided: userType });
            }

            const jobs = await this.jobRepository.getAllFulltimeJobsByEmployerId(employerId);
            return jobs;
        } catch (error) {
            throw new InternalServerError('Can not fetch jobs', error);
        }
    }

    async getAllInternshipJobsByEmployerId(employerId: number, token: string) {
        try {
            const user: AxiosResponse<User> = await axios.get(`http://localhost:4000/api/v1/users/${employerId}`, {
                headers: {
                    'x-access-token': token
                }
            });

            if(!user) {
                throw new BadRequestError('user not found', { user });
            }

            const userType = user.data.data.userType;
            if(userType != USER_TYPE.EMPLOYER) {
                throw new BadRequestError('User is not an employer, cam not show created jobs', { expected: USER_TYPE.EMPLOYER, provided: userType });
            }

            const jobs = await this.jobRepository.getAllInternshipJobsByEmployerId(employerId);
            return jobs;
        } catch (error) {
            throw new InternalServerError('Can not fetch jobs', error);
        }
    }

    async getAllPendingJobs(userId: number, token: string) {
        try {
            const user: AxiosResponse<User> = await axios.get(`http://localhost:4000/api/v1/users/${userId}`, {
                headers: {
                    'x-access-token': token
                },
            });

            if(!user) {
                throw new BadRequestError('user not found', { user });
            }

            const userRole = user.data.data.role;
            if(userRole != USER_ROLE.ADMIN) {
                throw new UnauthorizedError('You are not an admin, can not show pending jobs', { expected: USER_ROLE.ADMIN, provided: userRole });
            }

            const jobs = await this.jobRepository.getAllPendingJobs();
            return jobs;
        } catch (error) {
            if(error instanceof BaseError) throw error;
            throw new InternalServerError('Can not fetch jobs', error);
        }
    }

    async getJob(id: string) {
        try {
            const job = await this.jobRepository.get(id, 'jobId');
            return job;
        } catch (error) {
            if(error instanceof BaseError) throw error;
            throw new InternalServerError('Can not fetch the job', error);
        }
    }

    async updateJob(id: string, data: UpdateJobDto) {
        try {
            const job = await this.jobRepository.update(id, data);
            return job;
        } catch (error) {
            if(error instanceof BaseError) throw error;
            throw new InternalServerError('can not update the job', error);
        }
    }

    async approveJob(jobId: string, userId: number, token: string) {
        try {
            await this.jobRepository.get(jobId, 'jobId');
            const user: AxiosResponse<User> = await axios.get(`http://localhost:4000/api/v1/users/${userId}`, {
                headers: {
                    'x-access-token': token
                },
            });

            if(!user) {
                throw new BadRequestError('user not found', { user });
            }

            const userRole = user.data.data.role;
            if(userRole != USER_ROLE.ADMIN) {
                throw new UnauthorizedError('You are not an admin, can not give approval', { expected: USER_ROLE.ADMIN, provided: userRole });
            }

            const job = await this.getJob(jobId);
            if(job.jobState == JOB_STATE.APPROVED) {
                throw new BadRequestError('This job is already approved', { status: job.jobState });
            }
            
            await this.jobRepository.updateJobState(jobId, { jobState: JOB_STATE.APPROVED });
            return await this.getAllPendingJobs(userId, token);
        } catch (error) {
            if(error instanceof BaseError) throw error;
            throw new InternalServerError('Can not fetch the job', error);
        }
    }

    async getAllFulltimeJobsByFilter(query:CreateFilterDto) {
        const filter = this.createFilter(query);
        try {
            console.log('Calling by service');
            const jobs = await this.jobRepository.getAllFulltimeJobsByFilter(filter);
            return jobs;
        } catch (error) {
            throw new InternalServerError('Can not fetch data of all the jobs', error);
        }
    }

    async getAllInternshipJobsByFilter(query:CreateFilterDto) {
        const filter = this.createFilter(query);
        try {
            const jobs = await this.jobRepository.getAllInternshipJobsByFilter(filter);
            return jobs;
        } catch (error) {
            throw new InternalServerError('Can not fetch data of all the jobs', error);
        }
    }

    private createFilter(query: CreateFilterDto) {
        const customFilter: QueryFilter = {};

        if(query.jobTitle) {
            console.log('calling from query');
            const title = query.jobTitle.split(' ')[0];
            customFilter.jobTitle = ILike(`${title}%`);
        }

        if(query.jobType) {
            if(query.jobType == JOB_TYPE.IN_OFFICE) customFilter.jobType = JOB_TYPE.IN_OFFICE;
            else if(query.jobType == JOB_TYPE.REMOTE) customFilter.jobType = JOB_TYPE.REMOTE;
            else customFilter.jobType = JOB_TYPE.HYBRID;
        }

        if(query.minSalary) {
            if(query.minSalary == '0') {}
            else customFilter.minSalary = Between(Number(query.minSalary), Number(`${query.minSalary}.99`));
        }

        if(query.workExperience) {
            customFilter.workExperience = Like(`${query.workExperience}%`);
        }

        if(query.internshipType) {
            if(query.internshipType == INTERNSHIP_TYPE.TECH) customFilter.internshipType = INTERNSHIP_TYPE.TECH;
            else customFilter.internshipType = INTERNSHIP_TYPE.NON_TECH;
        }

        return customFilter;
    }

    isAuthenticated(token: string) {
        try {
            if(!token) {
                throw new UnauthorizedError('Missing JWT token', { token: undefined });
            }

            auth.verifyToken(token);
            return true;
        } catch (error) {
            if(error instanceof BaseError) throw error;

            if(error instanceof TokenExpiredError) {
                throw new UnauthorizedError('JWT token expired, Please login again', { token });
            }

            if(error instanceof JsonWebTokenError) {
                throw new UnauthorizedError('Invalid JWT token', { token });
            }

            throw new InternalServerError('Something went wrong', {});
        }
    }
}

export default JobService;