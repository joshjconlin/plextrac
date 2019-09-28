const jwt = require('jsonwebtoken');
const validateUser = require('./validateUser');

const requireAuth = (fn, roles = []) => {
    return async (request, h) => {
        if (!request.headers || !request.headers.authorization) {
            return h.response('Authorization required').code(403);
        }
        const decoded = jwt.decode(request.headers.authorization.replace('Bearer ', ''));
        const { user, valid } = await validateUser(decoded, roles);
        if (valid) {
            return await fn(request, h, user);
        } else {
            return h.response('Invalid token').code(403);
        }
    }
};

module.exports = requireAuth;
