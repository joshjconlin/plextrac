const Location = require('../models/Location');

class LocationRepository {

    async createLocation(location) {
        const $location = new Location(location);
        return await $location.save();
    }

    async getAllLocationsByUserId(userId) {
        return new Promise((resolve, reject) => {
            Location.find({ userId }, (err, locations) => {
               if (err) {
                   reject(err);
               } else {
                   resolve(locations);
               }
            });
        });
    }

    async deleteLocation(id) {
        return new Promise((resolve, reject) => {
           Location.deleteOne({ id }, (err, removeLocation) => {
               if (err) {
                   reject(err);
               } else {
                   resolve(removeLocation);
               }
           })
        });
    }
}

module.exports = new LocationRepository();
