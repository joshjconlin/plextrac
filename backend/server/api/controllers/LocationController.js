const requireAuth = require('../util/requireAuth');
const LocationRepository = require('../repositories/LocationRepository');

const getLocationRoutes = (server, options) => {
    server.route({
        method: 'POST',
        path: "/locations",
        handler: requireAuth(async (request, h, user) => {
            const location = request.payload;
            location.userId = user.id;
            try {
                const $location = await LocationRepository.createLocation(location);
                return h.response($location);
            } catch (e) {
                return h.response(e.message).code(500);
            }
        }),
    });

    server.route({
        method: 'GET',
        path: '/locations',
        handler: requireAuth(async (request, h, user) => {
            try {
                const locations = await LocationRepository.getAllLocationsByUserId(user.id);
                return h.response(locations);
            } catch (e) {
                return h.response(e.message).code(500);
            }
        }),
    });

    server.route({
        method: 'DELETE',
        path: '/locations/{id}',
        handler: requireAuth(async (request, h, user) => {
            try {
                const id = request.params.id;
                const deleted = await LocationRepository.deleteLocation(id);
                return h.response(deleted);
            } catch (e) {
                return h.response(e.message).code(500);
            }
        }),
    })
};

module.exports = getLocationRoutes;


