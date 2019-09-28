const Mongoose = require('mongoose');

const UserSchema = new Mongoose.Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    username: { type: String, required: true },
    admin: { type: Boolean, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    location: { type: Object, required: true },
});

const UserModel = Mongoose.model('User', UserSchema);

module.exports = UserModel;
