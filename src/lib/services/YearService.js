import BaseService from './BaseService';

class YearService extends BaseService {
    constructor() {
        super();
        this.service = '/year';
    }

    static getInstance() {
        if (!YearService.instance) {
            YearService.instance = new YearService();
        }
        return YearService.instance;
    }

    async getYears(limit = 'ALL') {
        const queryParams = this.makeParams({limit});
        return await this.handleReq(undefined, queryParams, 'GET');
    }

    async createYear(year, school_year) {
        const newYear = {
            year: year,
            school_year: school_year
        }
        return await this.handleReq(undefined, undefined, 'POST', newYear);
    }

    async getYear(year_id) {
        return await this.handleReq(this.url(year_id.toString()), undefined, 'GET');
    }

    async deleteYear(year_id) {
        return await this.handleReq(
            this.url(year_id.toString()),
            undefined,
            'DELETE'
        );
    }

    async updateYear(year_id, year, school_year) {
        const newYear = {
            year: year,
            school_year: school_year
        }
        return await this.handleReq(
            this.url(year_id.toString()),
            undefined,
            'PUT',
            newYear
        );
    }
}

export default YearService;