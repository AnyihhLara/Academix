import BaseService from './BaseService';

class StudentService extends BaseService {
	constructor() {
		super();
		this.service = '/student';
	}

	static getInstance() {
		if (!StudentService.instance) {
			StudentService.instance = new StudentService();
		}
		return StudentService.instance;
	}

	async getStudents(limit = 'ALL') {
		const queryParams = this.makeParams({ limit });
		return await this.handleReq(undefined, queryParams, 'GET');
	}

	async createStudent(
		student_name,
		student_lastname,
		student_sex,
		municipality,
		student_code,
		academic_situation_id,
		group_id,
		year_id,
		unenrollment_reason_id,
		user_id
	) {
		const student = {
			student_name: student_name,
			student_lastname: student_lastname,
			student_sex: student_sex,
			municipality: municipality,
			student_code: student_code,
			academic_situation_id: academic_situation_id,
			group_id: group_id,
			year_id: year_id,
			unenrollment_reason_id: unenrollment_reason_id,
			user_id: user_id
		};
		return await this.handleReq(undefined, undefined, 'POST', student);
	}

	async getStudent(student_id) {
		return await this.handleReq(this.url(student_id.toString()), undefined, 'GET');
	}

	async getStudentByUser(user_id) {
		const queryParams = this.makeParams({ user_id });
		return await this.handleReq(this.url('student_user'), queryParams, 'GET');
	}

	async deleteStudent(student_id) {
		return await this.handleReq(this.url(student_id.toString()), undefined, 'DELETE');
	}

	async updateStudent(
		student_id,
		student_name,
		student_lastname,
		student_sex,
		municipality,
		student_code,
		academic_situation_id,
		group_id,
		year_id,
		unenrollment_reason_id,
		user_id
	) {
		const student = {
			student_name: student_name,
			student_lastname: student_lastname,
			student_sex: student_sex,
			municipality: municipality,
			student_code: student_code,
			academic_situation_id: academic_situation_id,
			group_id: group_id,
			year_id: year_id,
			unenrollment_reason_id: unenrollment_reason_id,
			user_id: user_id
		};
		return await this.handleReq(this.url(student_id.toString()), undefined, 'PUT', student);
	}
}

export default StudentService;
