const getUserRoutes = require("./UserController");
const getWeatherRoutes = require('./WeatherController');
const getLocationRoutes = require('./LocationController');

module.exports = function getRoutes(server, options) {
    getUserRoutes(server, options);
    getWeatherRoutes(server, options);
    getLocationRoutes(server, options);
};
