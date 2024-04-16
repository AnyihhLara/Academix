import BaseService from './BaseService';

class UserService extends BaseService {
	constructor() {
		super();
		this.service = '/user';
	}

	static getInstance() {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}
		return UserService.instance;
	}

	async getUsers(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq(undefined, queryParams, 'GET');
	}

	async createUser(user_name, user_password, role_id, email) {
		const user = {
			user_name: user_name,
			user_password: user_password,
			role_id: role_id,
			email: email
		};
		return await this.handleReq(undefined, undefined, 'POST', user);
	}

	async getUser(user_id) {
		return await this.handleReq(this.url(user_id.toString()), undefined, 'GET');
	}

	async deleteUser(user_id) {
		return await this.handleReq(this.url(user_id.toString()), undefined, 'DELETE');
	}

	async updateUser(user_id, user_name, user_password, role_id, email) {
		const user = {
			user_name: user_name,
			user_password: user_password,
			role_id: role_id,
			email: email
		};
		return await this.handleReq(this.url(user_id.toString()), undefined, 'PUT', user);
	}
}

export default UserService;
