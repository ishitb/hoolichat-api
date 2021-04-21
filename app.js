const express = require('express');
const swaggerAutogen = require('swagger-autogen')();

const router = require('./routes/index');
const config = require('./config');

const app = express();

const init = async () => {
    if (!process.env.PORT) {
        return console.error('PORT not present in the environment');
    }

    /*
     * Middleware priority
     *
     * 0. Security (CORS, other headers)
     * 1. DB Connection
     * 2. JSON parser
     * 3. URLEncoded parser
     * 4. Static generator
     * 5. Team based rate limiter
     * 6. Router
     */

    app.set('trust proxy', 1);

    app.set('view engine', 'ejs');
    app.disable('X-Powered-By');

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use('/public', express.static('public'));

    app.use('/', router.router);

    app.listen(config.port, () => {
        console.log(`Now tuning into port: ${config.port}`);
    });
};

module.exports = {
    init,
};
