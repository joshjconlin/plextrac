const requireAuth = require('../util/requireAuth');
const weatherService = require("../services/weatherService");

const getWeatherRoutes = (server, options) => {
    server.route({
        method: 'GET',
        path: "/me/weather",
        handler: requireAuth(async (request, h, user) => {
            const userWeather = await weatherService.getUserWeather(user);
            return h.response(userWeather);
        }),
    });
};

module.exports = getWeatherRoutes;


