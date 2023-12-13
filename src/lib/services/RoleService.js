import BaseService from './BaseService';

class RoleService extends BaseService {
	constructor() {
		super();
		this.service = '/role';
	}

	static getInstance() {
		if (!RoleService.instance) {
			RoleService.instance = new RoleService();
		}
		return RoleService.instance;
	}

	async getRoles(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq(undefined, queryParams, 'GET');
	}

	async createRole(role_name) {
		const role = { role_name: role_name };
		return await this.handleReq(undefined, undefined, 'POST', role);
	}

	async getRole(role_id) {
		return await this.handleReq(this.url(role_id.toString()), undefined, 'GET');
	}

	async deleteRole(role_id) {
		return await this.handleReq(this.url(role_id.toString()), undefined, 'DELETE');
	}

	async updateRole(role_id, role_name) {
		const role = { role_name: role_name };
		return await this.handleReq(this.url(role_id.toString()), undefined, 'PUT', role);
	}
}

export default RoleService;