import { FastifyInstance } from 'fastify';

import jobRoute from './jobRoute';

async function v1Route(fastify: FastifyInstance) {
    fastify.register(jobRoute, { prefix: '/jobs' });
}

export default v1Route;