'use strict';

const getRoutes = require("./controllers");

const register = function (server, options) {
    getRoutes(server, options);
};

exports.plugin = {
    register,
    name: 'api'
};
