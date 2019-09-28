import ApiService from "./ApiService";

class PlextracSDK extends ApiService {
    constructor (auth_token = null) {
        super(auth_token);
    }

    async authenticate(user) {
        const response = await this.post('/authenticate', user);
        const { auth_token } = response.data;
        await this.initService(auth_token);
        return response;
    }

    async register(user) {
        const response = await this.post('/user', user);
        const { auth_token } = response.data;
        await this.initService(auth_token);
        return response;
    }

    async getMyWeather() {
        return this.get(`/me/weather`);
    }
}

export default new PlextracSDK();
