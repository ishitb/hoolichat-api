require('dotenv').config();
const mongoose = require('mongoose');

const expressApp = require('./app');

const dbUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@hoolichat.tr3ka.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// Mongo Connection
mongoose
    .connect(dbUri, options)
    .then((res) => {
        console.log('Connected to DB');

        expressApp.init();
    })
    .catch((err) => console.error(err));
