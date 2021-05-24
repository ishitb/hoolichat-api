const express = require('express');
const http = require('http');
const cors = require('cors');

const router = require('./routes/index');
const config = require('./config');
const socketio = require('./sockets/index');

const app = express();

const init = async () => {
    if (!global.process.env.PORT) {
        return global.console.error('PORT not present in the environment');
    }

    /*
     * Middleware priority
     *
     * 0. Security (CORS, other headers)
     * 1. View Engine
     * 2. JSON parser
     * 3. URLEncoded parser
     * 4. Static generator
     * 5. Router
     * 6. Socket config
     * 7. Server Start
     */

    app.set('trust proxy', 1);

    let allowlist = [
        'https://hooliapi.snu-labyrinth.tech',
        'http://localhost:3001',
        'http://127.0.0.1:5500',
    ];
    let corsOptionsDelegate = function (req, callback) {
        let corsOptions;
        if (allowlist.indexOf(req.header('Origin')) !== -1) {
            corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
        } else {
            corsOptions = { origin: false }; // disable CORS for this request
        }
        callback(null, corsOptions); // callback expects two parameters: error and options
    };
    app.use(cors());

    app.set('view engine', 'ejs');
    app.disable('X-Powered-By');

    app.use(express.json());

    app.use(express.urlencoded({ extended: false }));

    app.use('/public', express.static('public'));

    app.use('/', router.router);

    // Server set
    const httpServer = http.createServer(app);

    // Sockets
    socketio.socketConnection(httpServer);

    httpServer.listen(config.port);
    httpServer.on('listening', () => {
        global.console.log(`Now tuning into port: ${config.port}`);
    });
};

module.exports = {
    init,
};
