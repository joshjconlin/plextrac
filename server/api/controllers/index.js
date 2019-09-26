const getUserRoutes = require("./userController");

module.exports = function getRoutes(server, options) {
    getUserRoutes(server, options);
};
