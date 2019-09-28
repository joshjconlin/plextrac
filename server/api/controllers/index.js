const getUserRoutes = require("./userController");
const getWeatherRoutes = require('./weatherController');

module.exports = function getRoutes(server, options) {
    getUserRoutes(server, options);
    getWeatherRoutes(server, options);
};
