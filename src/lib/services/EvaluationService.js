import BaseService from './BaseService';

class EvaluationService extends BaseService {
	constructor() {
		super();
		this.service = '/evaluation';
	}

	static getInstance() {
		if (!EvaluationService.instance) {
			EvaluationService.instance = new EvaluationService();
		}
		return EvaluationService.instance;
	}

	async getEvaluations(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq(undefined, queryParams, 'GET');
	}

	async getEvaluationsOfStudent(student_id, limit = 'ALL') {
		const queryParams = this.makeParams({ limit, student_id });
		return await this.handleReq(undefined, queryParams, 'GET');
	}

	async createEvaluation(
		evaluation_type_id,
		student_id,
		subject_id,
		evaluation_date
	) {
		const evaluation = {
			evaluation_type_id: evaluation_type_id,
			student_id: student_id,
			subject_id: subject_id,
			evaluation_date: evaluation_date
		};
		return await this.handleReq(undefined, undefined, 'POST', evaluation);
	}

	async getEvaluation(evaluation_id) {
		return await this.handleReq(this.url(evaluation_id.toString()), undefined, 'GET');
	}

	async deleteEvaluation(evaluation_id) {
		return await this.handleReq(this.url(evaluation_id.toString()), undefined, 'DELETE');
	}

	async updateEvaluation(evaluation_id, evaluation) {
		return await this.handleReq(this.url(evaluation_id.toString()), undefined, 'PUT', evaluation);
	}
}

export default EvaluationService;
