import { FastifyInstance } from 'fastify';
import fastifyPlugin from 'fastify-plugin';

import JobRepository from './JobRepository';

async function repositoryPlugin(fastify: FastifyInstance) {
    fastify.decorate('jobRepository', new JobRepository());
}

export default fastifyPlugin(repositoryPlugin);