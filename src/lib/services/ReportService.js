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
		return await this.handleReq(this.url('2'), queryParams, 'GET');
	}

	async report3(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq(this.url('3'), queryParams, 'GET');
	}

	async report4(average_type = 'Acumulado', limit = 'ALL') {
		const queryParams = this.makeParams({ average_type, limit });
		return await this.handleReq(this.url('4'), queryParams, 'GET');
	}

	async report5(year, group_number, limit = 'ALL') {
		const queryParams = this.makeParams({ year, group_number, limit });
		return await this.handleReq(this.url('5'), queryParams, 'GET');
	}

	async report6(student_code, limit = 'ALL') {
		const queryParams = this.makeParams({ student_code, limit });
		return await this.handleReq(this.url('6'), queryParams, 'GET');
	}

	async report7(start_date, end_date, year, group_number, limit = 'ALL') {
		const queryParams = this.makeParams({ start_date, end_date, year, group_number, limit });
		return await this.handleReq(this.url('7'), queryParams, 'GET');
	}

	async report8(year, group_number, limit = 'ALL') {
		const queryParams = this.makeParams({ year, group_number, limit });
		return await this.handleReq(this.url('8'), queryParams, 'GET');
	}

	async report9(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq(this.url('9'), queryParams, 'GET');
	}
}

export default ReportService;
