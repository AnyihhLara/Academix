import { popup, loading } from '$lib/stores/stores.js';

class BaseService {
    constructor() {
        if (new.target === BaseService) {
            throw new Error('No se puede instanciar una clase abstracta');
        }
        this.service = '';
    }

    url(extra) {
        const SERVICES_PROXY_BASE = `/api/services`;
        let result;
        if (!extra)
            result = SERVICES_PROXY_BASE + this.service;
        else if (extra.startsWith('?'))
            result = SERVICES_PROXY_BASE + this.service + extra;
        else
            result = SERVICES_PROXY_BASE + this.service + '/' + extra;
        return result;
    }

    makeParams(params) {
        let queryParams = '?';
        const queryBuilder = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            queryBuilder.append(key, value);
        });
        queryParams += queryBuilder.toString();
        return queryParams;
    }

    async handleReq(
        route = this.url(),
        queryparams = '',
        method = 'GET',
        body = undefined,
        headers = new Headers()
    ) {
        let r = {};
        if ((method === 'PUT' || method === 'POST') && body) {
            headers.append('Content-Type', 'application/json');
            r.body = JSON.stringify(body);
        }

        r.headers = headers;
        r.method = method;

        return await new Promise((resolve, reject) => {
            loading.update(() => true);
            fetch(route + queryparams, r)
                .then(async (response) => {
                    if (response.status >= 400) {
                        let error = JSON.parse(await response.text());
                        this.parseError(error);
                        reject(error);
                    } else return response.json();
                })
                .then((responseData) => {
                    loading.update(() => false);
                    resolve(responseData);
                })
                .catch((err) => {
                    console.error(err.message);
                    loading.update(() => false);
                    reject(popup);
                });
        });
    }

    parseError(error) {
        console.error(error);
        let message = '';
        if (error.message)
            message = error.message;
        else if (error.original?.hint)
            message = error.original.hint;
        else if (error.parent?.code === '23503')
            message = 'Este elemento no se puede eliminar ahora porque es referenciado en otro lugar.';
        else if (error.errors[0]?.message)
            message = error.errors[0].message;
        popup.update(() => ({
            type: 'error',
            message,
        }));
    }
}

export default BaseService;
