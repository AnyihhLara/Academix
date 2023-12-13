import BaseService from "$lib/services/BaseService.js";

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
        return await this.handleReq(this.url('login'), undefined, 'POST', login);
    }

    async getRoleName(id_role) {
        return await this.handleReq(this.url('role/' + id_role), undefined, 'GET')
    }

    getAuthorizedRoutes(role) {
        let authorized_routes;
        const users = '/academix/users';
        const roles = '/academix/roles'
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
        const report1 = '/academix/reports/1';
        const report2 = '/academix/reports/2';
        const report3 = '/academix/reports/3';
        const report4 = '/academix/reports/4';
        const report5 = '/academix/reports/5';
        const report6 = '/academix/reports/6';
        const report7 = '/academix/reports/7';
        const report8 = '/academix/reports/8';
        const report9 = '/academix/reports/9';

        if (role) {
            switch (role) {
                case 'Administrador':
                    authorized_routes = [
                        administratorMain,
                        users,
                        roles
                    ];
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
                        reports,
                        report1,
                        report2,
                        report3,
                        report4,
                        report5,
                        report6,
                        report7,
                        report8,
                        report9
                    ];
                    break
                case 'Estudiante':
                    authorized_routes = [
                        studentMain,
                        evaluations,
                        reports,
                        report4,
                        report5
                    ];
                    break
                case 'Profesor':
                    authorized_routes = [
                        teacherMain,
                        evaluations,
                        students,
                        subjects,
                        reports,
                        report1,
                        report2,
                        report3,
                        report4,
                        report5,
                        report6,
                        report7,
                        report8,
                        report9
                    ];
                    break
                default:
                    authorized_routes = ['/auth/login'];
            }
        }
        else {
            authorized_routes = ['/auth/login'];
        }

        return authorized_routes;
    }
}

export default AuthService;
