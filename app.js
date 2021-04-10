const express = require('express');

const router = require('./routes/index');

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

    app.use(express.static('public'));

    app.use('/', router.router);

    app.listen(process.env.PORT || 3000, () => {
        console.log(`Now tuning into port: ${process.env.PORT}`);
    });
};

module.exports = {
    init,
};
