const axios = require('axios');
const Config = require('../../../config');

class weatherService {

    constructor() {
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        this.apiKey = Config.get('/apiKey');
    }

    async getUserWeather(user) {
        const response = await axios.get(`${this.baseUrl}?zip=${user.location.zip}&APPID=${this.apiKey}`);
        return response.data;
    }
}

module.exports = new weatherService();
