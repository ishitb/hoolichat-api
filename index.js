require('dotenv').config();
const mongoose = require('mongoose');

const expressApp = require('./app');
const config = require('./config');

// Mongo Connection
mongoose
    .connect(config.db.uri, config.db.options)
    .then((res) => {
        global.console.log('Connected to DB');

        expressApp.init();
    })
    .catch((err) => global.console.error(err));
