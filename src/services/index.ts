import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import JobService from './JobService';

async function servicePlugin(fastify: FastifyInstance) {
    fastify.decorate('jobService', new JobService(fastify.jobRepository));
}

export default fastifyPlugin(servicePlugin);