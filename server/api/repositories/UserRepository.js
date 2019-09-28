const bcrypt = require('bcrypt');
const User = require('../models/User');
const _createToken = require('../util/createToken');

class UserRepository {

    constructor() {
        this.whitelist = [
            'josh@moderncodesolutions.com',
        ];
    }

    static createToken(user) {
        return _createToken(user);
    };

    static async hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(hash);
                    }
                });
            });
        })
    }

    async authenticateUser(user) {
        const $user = await this.validateUser(user);
        delete $user.password;
        return {user: $user, auth_token: UserRepository.createToken($user)};
    };

    async validateUser(user) {
        const password = user.password;
        return new Promise((resolve, reject) => {
            User.findOne({
                $or: [
                    {email: user.email},
                ]
            }, (err, $user) => {
                if (err) {
                    reject(err);
                } else {
                    bcrypt.compare(password, $user.password, (err, isValid) => {
                        if (isValid) {
                            delete $user.password;
                            resolve($user);
                        } else {
                            reject('Invalid Password');
                        }
                    });
                }
            });
        })
    };


    async createUser(user) {
        const password = await UserRepository.hashPassword(user.password);
        const admin = this.whitelist.includes(user.email);
        const $user = new User({
            ...user,
            password,
            admin,
            username: `${user.firstName.toLowerCase()}${user.lastName.toLowerCase()}`
        });
        return await $user.save();
    }

    async getUserById(id) {
        return new Promise(async (resolve, reject) => {
            User.findById(id, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    if (user) {
                        delete user.password;
                    }
                    resolve(user);
                }
            });
        });
    }

    async getAllUsers() {
        return new Promise((resolve, reject) => {
            User.find({}, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    async updateUser(id, updateUser) {
        return new Promise((resolve, reject) => {
            User.updateOne({id}, updateUser, (err, user) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(user);
                }
            });
        });
    }
}

module.exports = new UserRepository();
