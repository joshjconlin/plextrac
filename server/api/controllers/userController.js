const UserRepository = require('../repositories/UserRepository');
const requireAuth = require('../util/requireAuth');

const getUserRoutes = (server, options) => {
    server.route({
        method: "POST",
        path: "/authenticate",
        options: {
            validate: {
                // email: Joi.string().required(),
                // password: Joi.string().required()
            },
        },
        handler: async (request, h) => {
            try {
                const user = request.payload;
                const token = await UserRepository.authenticateUser(user);
                return h.response(token);
            } catch (e) {
                return h.response(e.message ? e.message : e).code(400);
            }
        }
    });

    server.route({
        method: "POST",
        path: "/user",
        options: {
            validate: {
                // todo:
            }
        },
        handler: async (request, h) => {
            try {
                const user = await UserRepository.createUser(request.payload);
                const token = await UserRepository.constructor.createToken(user);
                return h.response({auth_token: token, user});
            } catch (e) {
                return h.response(e.message).code(500);
            }
        }
    });

    server.route({
        method: 'GET',
        path: "/user/me",
        handler: requireAuth(async (request, h, user) => {
            return h.response(user);
        }),
    });

    server.route({
        method: "GET",
        path: "/user/{id}",
        handler: requireAuth(async (request, h, user) => {
            try {
                const id = request.params.id;
                if (user.id !== id && !user.admin) {
                    return h.response('You cannot view that user').code(403);
                }
                const user = await UserRepository.getUserById(id);
                return h.response(user);
            } catch (e) {
                return h.response(e.message).code(404);
            }
        })
    });

    server.route({
        method: "PUT",
        path: "/user/{id}",
        options: {
            validate: {
                // todo:
            },
        },
        handler: requireAuth(async (request, h, user) => {
            try {
                const id = request.params.id;
                if (user.id !== id && !user.admin) {
                    return h.response('You cannot update this user').code(403);
                }
                return h.response(await UserRepository.updateUser(id, request.payload));
            } catch (e) {
                return h.response(e.message).code(500);
            }
        })
    });

    server.route({
        method: "DELETE",
        path: "/user/{id}",
        handler: async (request, h) => {
            try {
                const id = request.params.id;
                return await UserRepository.deleteUser(id);
            } catch (e) {
                return h.response(e.message).code(500);
            }
        }
    });
};

module.exports = getUserRoutes;


