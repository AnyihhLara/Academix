import BaseService from './BaseService';

class AcademicSituationService extends BaseService {
    constructor() {
        super();
        this.service = '/academic_situation';
    }

    static getInstance() {
        if (!AcademicSituationService.instance) {
            AcademicSituationService.instance = new AcademicSituationService();
        }
        return AcademicSituationService.instance;
    }

    async getAcademicSituations(limit = 'ALL') {
        const queryParams = this.makeParams({ limit });
        return await this.handleReq(undefined, queryParams, 'GET');
    }

    async createAcademicSituation(academic_situation_name) {
        const academic_situation = {
            academic_situation_name: academic_situation_name
        }
        return await this.handleReq(undefined, undefined, 'POST', academic_situation);
    }

    async getAcademicSituation(academic_situation_id) {
        return await this.handleReq(this.url(academic_situation_id.toString()), undefined, 'GET');
    }

    async deleteAcademicSituation(academic_situation_id) {
        return await this.handleReq(
            this.url(academic_situation_id.toString()),
            undefined,
            'DELETE'
        );
    }

    async updateAcademicSituation(academic_situation_id, academic_situation) {
        return await this.handleReq(
            this.url(academic_situation_id.toString()),
            undefined,
            'PUT',
            academic_situation
        );
    }
}

export default AcademicSituationService;