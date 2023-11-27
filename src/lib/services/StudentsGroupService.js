import BaseService from './BaseService';

class StudentsGroupService extends BaseService {
    constructor() {
        super();
        this.service = '/students_group';
    }

    static getInstance() {
        if (!StudentsGroupService.instance) {
            StudentsGroupService.instance = new StudentsGroupService();
        }
        return StudentsGroupService.instance;
    }

    async getStudentsGroups(limit = 'ALL') {
        const queryParams = this.makeParams({ limit });
        return await this.handleReq(undefined, queryParams, 'GET');
    }

    async createStudentsGroup(year_id, group_number) {
        const students_group = {
            year_id: year_id,
            group_number: group_number
        }
        return await this.handleReq(undefined, undefined, 'POST', students_group);
    }

    async getStudentsGroup(students_group_id) {
        return await this.handleReq(this.url(students_group_id.toString()), undefined, 'GET');
    }

    async deleteStudentsGroup(students_group_id) {
        return await this.handleReq(
            this.url(students_group_id.toString()),
            undefined,
            'DELETE'
        );
    }

    async updateStudentsGroup(students_group_id, students_group) {
        return await this.handleReq(
            this.url(students_group_id.toString()),
            undefined,
            'PUT',
            students_group
        );
    }
}

export default StudentsGroupService;