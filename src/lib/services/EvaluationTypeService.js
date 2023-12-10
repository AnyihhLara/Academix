import BaseService from './BaseService';

class EvaluationTypeService extends BaseService {
    constructor() {
        super();
        this.service = '/evaluation_type';
    }

    static getInstance() {
        if (!EvaluationTypeService.instance) {
            EvaluationTypeService.instance = new EvaluationTypeService();
        }
        return EvaluationTypeService.instance;
    }

    async getEvaluationTypes(limit = 'ALL') {
        const queryParams = this.makeParams({ limit });
        return await this.handleReq(undefined, queryParams, 'GET');
    }

    async createEvaluationType(evaluation_type_name, evaluation_numerical_value) {
        const evaluation_type = {
            evaluation_type_name: evaluation_type_name,
            evaluation_numerical_value: evaluation_numerical_value
        }
        return await this.handleReq(undefined, undefined, 'POST', evaluation_type);
    }

    async getEvaluationType(evaluation_type_id) {
        return await this.handleReq(this.url(evaluation_type_id.toString()), undefined, 'GET');
    }

    async deleteEvaluationType(evaluation_type_id) {
        return await this.handleReq(
            this.url(evaluation_type_id.toString()),
            undefined,
            'DELETE'
        );
    }

    async updateEvaluationType(evaluation_type_id, evaluation_type_name, evaluation_numerical_value) {
        const evaluation_type = {
            evaluation_type_name: evaluation_type_name,
            evaluation_numerical_value: evaluation_numerical_value
        }

        return await this.handleReq(
            this.url(evaluation_type_id.toString()),
            undefined,
            'PUT',
            evaluation_type
        );
    }
}

export default EvaluationTypeService;