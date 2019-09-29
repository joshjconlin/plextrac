'use strict';
const Composer = require('./index');
const Mongoose = require("mongoose");
const Config = require('./config');

const startServer = async () => {
    try {
        const server = await Composer();
        Mongoose.connect(Config.get('/mongo')).then((start) => {
            console.log('connected Mongoose', start);
        }).catch(e => console.warn(e, 'failed to connect mongoose'));

        await server.start();
        console.log('Started the plot device app on port ' + server.info.port);
        return server;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

startServer();

