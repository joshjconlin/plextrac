const Mongoose = require('mongoose');

const UserSchema = Mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    location: {
        city: String,
        zip: Number,
        state: String,
        country: String,
    },
    savedLocations: Array, // Location ^
});

const UserModel = Mongoose.model('User', UserSchema);

module.exports = UserModel;
