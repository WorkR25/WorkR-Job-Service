import { FindOperator } from 'typeorm';

import { INTERNSHIP_TYPE } from '../utils/enums/InternshipType';
import { JOB_TYPE } from '../utils/enums/JobType';

export interface QueryFilter {
    jobType?: JOB_TYPE
    workExperience?: FindOperator<string>
    jobTitle?: FindOperator<string>
    minSalary?: FindOperator<number>
    internshipType?: INTERNSHIP_TYPE
}