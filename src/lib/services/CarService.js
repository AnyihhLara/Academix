import BaseService from './BaseService';

class CarService extends BaseService {
    constructor() {
        super();
        this.service = '/car';
    }

    static getInstance() {
        if (!CarService.instance) {
            CarService.instance = new CarService();
        }
        return CarService.instance;
    }

    async getCars(limit = 'ALL') {
        const queryParams = this.makeParams({ limit });
        return await this.handleReq(undefined, queryParams, 'GET');
    }

    async createCar(car_fleet, licence_plate, id_brand) {
        const car = {
            car_fleet: car_fleet,
            licence_plate: licence_plate,
            id_brand: id_brand
        }
        return await this.handleReq(undefined, undefined, 'POST', car);
    }

    async getCar(id_car) {
        return await this.handleReq(this.url(id_car.toString()), undefined, 'GET');
    }

    async deleteCar(id_car) {
        return await this.handleReq(
            this.url(id_car.toString()),
            undefined,
            'DELETE'
        );
    }

    async updateCar(id_car, car) {
        return await this.handleReq(
            this.url(id_car.toString()),
            undefined,
            'PUT',
            car
        );
    }

    async getCarDriver(id_car) {
        return await this.handleReq(
            this.url(id_car.toString() + '/driver'),
            undefined,
            'GET'
        );
    }
}

export default CarService;
