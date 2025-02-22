import { DeepPartial, EntityTarget, ObjectLiteral } from 'typeorm';

import dataSource from '../dataSource';
import NotFoundError from '../errors/NotFoundError';
import Job from '../models/Job';
import { JOB_STATE } from '../utils/enums/JobState';

class CrudRepository {
    private repository;

    constructor(entity: EntityTarget<Job>) {
        this.repository = dataSource.getRepository(entity);
    }

    async create(data: DeepPartial<ObjectLiteral>) {
        const entity = this.repository.create(data);
        return await this.repository.save(entity);
    }

    async getAll() {
        const response = await this.repository.find({
            where: {
                jobState: JOB_STATE.APPROVED
            },
            order: {
                createdAt: 'DESC'
            }
        });
        return response;
    }

    async get(id: string, columnName: string) {
        const response = await this.repository.findOne({
            where: { id }
        });

        if(!response) {
            throw new NotFoundError(columnName, `${id}`);
        }

        return response;
    }

    async update(id: string, data: DeepPartial<ObjectLiteral>) {
        const updatedData = await this.repository.update(id, data);

        if(updatedData.affected == 0) {
            throw new NotFoundError('Id', `${id}`);
        }
        
        const response = await this.repository.findOne({
            where: { id }
        });

        return response;
    }

    async destroy(id: string) {
        const response = await this.repository.findOne({
            where: { id }
        });

        if(!response) {
            throw new NotFoundError('Id', `${id}`);
        }

        await this.repository.delete(id);
        return response;
    }
}

export default CrudRepository;