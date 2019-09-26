const User = require('../models/User');

const getUserRoutes = (server, options) => {
    server.route({
        method: "POST",
        path: "/user",
        options: {
            validate: {}
        },
        handler: async (request, h) => {
            try {
                const User = new User(request.payload);
                const result = await User.save();
                return h.response(result);
            } catch (e) {
                return h.response(e).status(500);
            }
        }
    });

    server.route({
        method: "GET",
        path: "/users",
        handler: async (request, h) => {
        }
    });

    server.route({
        method: "GET",
        path: "/user/{id}",
        handler: async (request, h) => {
        }
    });

    server.route({
        method: "PUT",
        path: "/user/{id}",
        options: {
            validate: {}
        },
        handler: async (request, h) => {
        }
    });

    server.route({
        method: "DELETE",
        path: "/user/{id}",
        handler: async (request, h) => {
        }
    });
};

module.exports = getUserRoutes;


