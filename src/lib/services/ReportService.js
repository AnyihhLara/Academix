import BaseService from './BaseService'

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
    async report1() {
    }
    async report2() {
    }
    async report3() {
    }
    async report4() {
    }
    async report5() {
    }
    async report6() {
    }
    async report7() {
    }
    async report8() {
    }
    async report9() {
    }
}
export default ReportService;