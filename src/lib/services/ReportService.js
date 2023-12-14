import BaseService from './BaseService';

class ReportService extends BaseService {
	constructor() {
		super();
		this.service = '/reports';
	}

	static getInstance() {
		if (!ReportService.instance) {
			ReportService.instance = new ReportService();
		}
		return ReportService.instance;
	}

	async report1(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq(this.url('1'), queryParams, 'GET');
	}

	async report2(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('2', queryParams, 'GET');
	}

	async report3(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('3', queryParams, 'GET');
	}

	async report4(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('4', queryParams, 'GET');
	}

	async report5(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('5', queryParams, 'GET');
	}

	async report6(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('6', queryParams, 'GET');
	}

	async report7(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('7', queryParams, 'GET');
	}

	async report8(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('8', queryParams, 'GET');
	}

	async report9(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq('9', queryParams, 'GET');
	}
}

export default ReportService;
