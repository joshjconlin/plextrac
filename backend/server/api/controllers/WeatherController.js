const requireAuth = require('../util/requireAuth');
const WeatherService = require("../services/WeatherService");
const LocationRepository = require('../repositories/LocationRepository');

const getWeatherRoutes = (server, options) => {
    server.route({
        method: 'GET',
        path: "/me/weather",
        handler: requireAuth(async (request, h, user) => {
            const locations = await LocationRepository.getAllLocationsByUserId(user.id);
            const userWeather = await WeatherService.getLocationsWeather([user.location, ...locations]);
            return h.response(userWeather);
        }),
    });
};

module.exports = getWeatherRoutes;


