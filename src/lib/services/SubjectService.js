import BaseService from './BaseService';

class SubjectService extends BaseService {
    constructor() {
        super();
        this.service = '/subject';
    }

    static getInstance() {
        if (!SubjectService.instance) {
            SubjectService.instance = new SubjectService();
        }
        return SubjectService.instance;
    }

    async getSubjects(limit = 'ALL') {
        const queryParams = this.makeParams({ limit });
        return await this.handleReq(undefined, queryParams, 'GET');
    }

    async createSubject(subject_name, planned_hours, year_id) {
        const subject = {
            subject_name: subject_name,
            planned_hours: planned_hours,
            year_id: year_id
        }
        return await this.handleReq(undefined, undefined, 'POST', subject);
    }

    async getSubject(subject_id) {
        return await this.handleReq(this.url(subject_id.toString()), undefined, 'GET');
    }

    async deleteSubject(subject_id) {
        return await this.handleReq(
            this.url(subject_id.toString()),
            undefined,
            'DELETE'
        );
    }

    async updateSubject(subject_id, subject) {
        return await this.handleReq(
            this.url(subject_id.toString()),
            undefined,
            'PUT',
            subject
        );
    }
}

export default SubjectService;