import { FastifyInstance } from 'fastify';

import jobController from '../../controllers/jobController';
import { createJobZodSchema, jobIdZodSchema, updateJobZodSchema } from '../../dtos/JobDto';
import { validator } from '../../validators/validateRequest';

async function jobRoute(fastify: FastifyInstance) {
    fastify.post('/', {
        preValidation: validator({ body: createJobZodSchema })
    }, jobController.createJob);

    fastify.get('/fulltime', {
        preValidation: validator({})
    }, jobController.getAllFulltimeJobs);

    fastify.get('/internship', {
        preValidation: validator({})
    }, jobController.getAllInternshipJobs);

    fastify.get('/:id', {
        preValidation: validator({ params: jobIdZodSchema })
    }, jobController.getJob);

    fastify.get('/:userId/fulltime', {
        preValidation: validator({})
    }, jobController.getAllFulltimeJobsByEmployerId);

    fastify.get('/:userId/internship', {
        preValidation: validator({})
    }, jobController.getAllIntershipJobsByEmployerId);

    fastify.get('/pendingjobs', {
        preValidation: validator({})
    }, jobController.getAllPendingJobs);

    fastify.get('/fulltime/filters', {
        preValidation: validator({})
    }, jobController.getAllFulltimeJobsByFilter);

    fastify.get('/internship/filters', {
        preValidation: validator({})
    }, jobController.getAllInternshipJobsByFilter);

    fastify.put('/:id/update', {
        preValidation: validator({ params: jobIdZodSchema, body: updateJobZodSchema })
    }, jobController.updateJob);

    fastify.patch('/approve', {
        preValidation: validator({})
    }, jobController.approveJob);
}

export default jobRoute;