const UserRepository = require('../repositories/UserRepository');

const validate = async function (decoded, roles) {

    // do your checks to see if the person is valid
    const user = await UserRepository.getUserById(decoded.id);
    const userRole = user.admin ? 'admin' : 'user';
    let valid = !!user;
    if (roles.length && valid) {
        valid = roles.includes(userRole);
    }
    return {
        user,
        valid,
    };
};

module.exports = validate;
