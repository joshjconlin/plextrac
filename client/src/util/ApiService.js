import CONFIG from '../Config';
import axios from 'axios';

class ApiService {
    constructor (auth_token = null) {
        this.auth_token = auth_token;
        this.initService(auth_token);
    }

    async initService (auth_token) {
        return new Promise((resolve) => {
            const headers = {
                'Content-Type': 'application/json',
            //    header('Access-Control-Allow-Origin: *');
                // header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
                // header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
            };
            if (auth_token) {
                headers['authorization'] = `Bearer ${auth_token}`;
            }
            this.base_url = CONFIG.API_URL;
            this.service = axios.create({
                baseURL: CONFIG.API_URL,
                timeout: 6000,
                headers
            });
            resolve();
        });
    }

    getBaseUrl () {
        return this.base_url;
    }

    async setAuthToken (token) {
        this.auth_token = token;
        await this.initService(token);
    }

    getAuthToken () {
        return this.auth_token;
    }

    getService () {
        return this.service;
    }

    async get (url, config) {
        return this.service.get(url, config);
    }

    async delete (url, config) {
        return this.service.delete(url, config);
    }

    async post (url, data, config) {
        return this.service.post(url, data, config);
    }

    async put (url, data, config) {
        return this.service.put(url, data, config);
    }

    async patch (url, data, config) {
        return this.service.patch(url, data, config);
    }
}

export default ApiService;
