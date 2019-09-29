const axios = require('axios');
const Config = require('../../../config');

class WeatherService {

    constructor() {
        this.baseUrl = "https://api.openweathermap.org/data/2.5/weather";
        this.apiKey = Config.get('/apiKey');
    }

    async getUserWeather(user) {
        const response = await axios.get(`${this.baseUrl}?zip=${user.location.zip}&APPID=${this.apiKey}`);
        return response.data;
    }

    async getLocationWeather(location) {
        const response = await axios.get(`${this.baseUrl}?zip=${location.zip}&APPID=${this.apiKey}`);
        return response.data;
    }

    async getLocationsWeather(locations) {
        return await Promise.all(locations.map((location) => {
            return this.getLocationWeather(location);
        }));
    }
}

module.exports = new WeatherService();
