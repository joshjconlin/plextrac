const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: Number, required: true },
    state: { type: String, required: true },
    country: { type: String, default: 'USA' },
});

const LocationModel = mongoose.model('Location', LocationSchema);

module.exports = LocationModel;
