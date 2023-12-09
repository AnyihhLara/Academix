import BaseService from "$lib/services/BaseService.js";
import { loggedUser } from "$lib/stores/stores.js";
import { get } from "svelte/store";

class AuthService extends BaseService {
    constructor() {
        super();
        this.service = '/auth';
    }

    static getInstance() {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    async login(login) {
        return await this.handleReq(this.url('login'), undefined, 'POST', login)
    }

    async getRoleName(id_role) {
        return await this.handleReq(this.url('role/' + id_role), undefined, 'GET')
    }

    getAuthorizedRoutes() {
        let authorized_routes = [];
        const users = '/academix/users';
        const academic_situations = '/academix/academic_situations';
        const evaluation_types = '/academix/evaluation_types';
        const evaluations = '/academix/evaluations';
        const students = '/academix/students';
        const students_groups = '/academix/students_groups';
        const subjects = '/academix/subjects';
        const unenrollment_reasons = '/academix/unenrollment_reasons';
        const years = '/academix/years';
        const administratorMain = '/academix/main/administrator';
        const secretaryMain = '/academix/main/secretary';
        const studentMain = '/academix/main/student';
        const teacherMain = '/academix/main/teacher';
        const reports = '/academix/reports';

        const role = get(loggedUser).role_name
        switch (role) {
            case 'Administrador':
                authorized_routes = [
                    administratorMain,
                    users
                ]
                break
            case 'Secretario':
                authorized_routes = [
                    secretaryMain,
                    academic_situations,
                    evaluation_types,
                    students,
                    students_groups,
                    subjects,
                    unenrollment_reasons,
                    years,
                    reports
                ]
                break
            case 'Estudiante':
                authorized_routes = [
                    studentMain,
                    evaluations,
                    reports
                ]
                break
            case 'Profesor':
                authorized_routes = [
                    teacherMain,
                    evaluations,
                    students,
                    subjects,
                    reports
                ]
                break
            default:
                authorized_routes = ['/auth/login']
        }
        return authorized_routes
    }
}

export default AuthService;
