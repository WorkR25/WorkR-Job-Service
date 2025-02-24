import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { ApproveJobDto, CreateFilterDto, CreateJobDto, JobIdDto, UpdateJobDto, UserIdDto } from '../dtos/JobDto';
import SuccessResponse from '../utils/common/SuccessResponse';

async function createJob(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const requestBody = req.body as CreateJobDto;
        const response = await this.jobService.createJob(requestBody);
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getAllFulltimeJobs(this: FastifyInstance, _req: FastifyRequest, res: FastifyReply) {
    try {
        const response = await this.jobService.getAllFulltimeJobs();
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getAllInternshipJobs(this: FastifyInstance, _req: FastifyRequest, res: FastifyReply) {
    try {
        const response = await this.jobService.getAllInternshipJobs();
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getAllFulltimeJobsByEmployerId(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const requestParams = req.params as UserIdDto;
        const token = req.headers['x-access-token'] as string;
        const response = await this.jobService.getAllFulltimeJobsByEmployerId(Number(requestParams.userId), token);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getAllIntershipJobsByEmployerId(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const requestParams = req.params as UserIdDto;
        const token = req.headers['x-access-token'] as string;
        const response = await this.jobService.getAllInternshipJobsByEmployerId(Number(requestParams.userId), token);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getAllPendingJobs(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const queryParams = req.query as UserIdDto;
        const token = req.headers['x-access-token'] as string;
        const response = await this.jobService.getAllPendingJobs(Number(queryParams.userId), token);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getJob(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const requestParams = req.params as JobIdDto;
        const response = await this.jobService.getJob(requestParams.id);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function updateJob(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const requestBody = req.body as UpdateJobDto;
        const requestParams = req.params as JobIdDto;
        const response = await this.jobService.updateJob(requestParams.id, requestBody);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function approveJob(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const requestBody = req.body as ApproveJobDto;
        const token = req.headers['x-access-token'] as string;
        const response = await this.jobService.approveJob(requestBody.jobId, requestBody.userId, token);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getAllFulltimeJobsByFilter(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        console.log('calling from controller');
        const queryParams = req.query as CreateFilterDto;
        const response = await this.jobService.getAllFulltimeJobsByFilter(queryParams);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

async function getAllInternshipJobsByFilter(this: FastifyInstance, req: FastifyRequest, res: FastifyReply) {
    try {
        const queryParams = req.query as CreateFilterDto;
        const response = await this.jobService.getAllInternshipJobsByFilter(queryParams);
        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).send(SuccessResponse);
    } catch (error) {
        throw error;
    }
}

export default {
    createJob,
    getAllFulltimeJobs,
    getAllInternshipJobs,
    getAllFulltimeJobsByEmployerId,
    getAllIntershipJobsByEmployerId,
    getJob,
    getAllPendingJobs,
    getAllFulltimeJobsByFilter,
    getAllInternshipJobsByFilter,
    updateJob,
    approveJob
};