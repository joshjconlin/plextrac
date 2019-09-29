'use strict';

const Confidence = require('confidence');


const criteria = {
    env: process.env.NODE_ENV
};


const config = {
    $meta: 'This file configures the plot device.',
    projectName: 'sample',
    port: {
        web: {
            $filter: 'env',
            test: 9090,
            $default: 8080
        },
    },
    mongo: "mongodb://mongodb:27017",
    secret: "supersecuresecret",
    apiKey: "620d2153191e66ac1a101a72315f1754"
};


const store = new Confidence.Store(config);


exports.get = function (key) {

    return store.get(key, criteria);
};


exports.meta = function (key) {

    return store.meta(key, criteria);
};
