const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');

const swaggerDocs = require('../docs/swagger-output.json');
const { authenticate } = require('../middleware/auth');
const homeRoute = require('./home').router;
const blogRoute = require('./blogs').router;
const authRoute = require('./auth').router;
const workspaceRoute = require('./workspace').router;
const roomRoute = require('./room').router;
const messageRoute = require('./message').router;

router.use('/', homeRoute);
router.use('/blogs', blogRoute);
router.use('/auth', authRoute);
router.use('/workspace', authenticate, workspaceRoute);
router.use('/room', authenticate, roomRoute);
router.use('/messages', authenticate, messageRoute);

// Swagger Docs
swaggerDocs.host = global.process.env.PRODUCTION_URL || 'localhost:3000';
router.use('/docs', swaggerUI.serve);
router.get('/docs', swaggerUI.setup(swaggerDocs));

module.exports = {
    router,
};
