import BaseService from './BaseService';

class UnenrollmentReasonService extends BaseService {
    constructor() {
        super();
        this.service = '/unenrollment_reason';
    }

    static getInstance() {
        if (!UnenrollmentReasonService.instance) {
            UnenrollmentReasonService.instance = new UnenrollmentReasonService();
        }
        return UnenrollmentReasonService.instance;
    }

    async getUnenrollmentReasons(limit = 'ALL') {
        const queryParams = this.makeParams({limit});
        return await this.handleReq(undefined, queryParams, 'GET');
    }

    async createUnenrollmentReason(unenrollment_reason_name) {
        const unenrollment_reason = {
            unenrollment_reason_name: unenrollment_reason_name,
        }
        return await this.handleReq(undefined, undefined, 'POST', unenrollment_reason);
    }

    async getUnenrollmentReason(unenrollment_reason_id) {
        return await this.handleReq(this.url(unenrollment_reason_id.toString()), undefined, 'GET');
    }

    async deleteUnenrollmentReason(unenrollment_reason_id) {
        return await this.handleReq(
            this.url(unenrollment_reason_id.toString()),
            undefined,
            'DELETE'
        );
    }

    async updateUnenrollmentReason(unenrollment_reason_id, unenrollment_reason_name) {
        const unenrollment_reason = {
            unenrollment_reason_name: unenrollment_reason_name,
        }
        return await this.handleReq(
            this.url(unenrollment_reason_id.toString()),
            undefined,
            'PUT',
            unenrollment_reason
        );
    }
}

export default UnenrollmentReasonService;