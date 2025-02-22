import JobRepository from '../repositories/JobRepository';
import JobService from '../services/JobService';

declare module 'fastify' {
    interface FastifyInstance {
        // Services
        jobService: JobService

        // Repsotories
        jobRepository: JobRepository
    }
}