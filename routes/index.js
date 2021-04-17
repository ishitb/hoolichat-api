const router = require('express').Router();

const { authenticate } = require('../middleware/auth');
const homeRoute = require('./home').router;
const blogRoute = require('./blogs').router;
const authRoute = require('./auth').router;
const workspaceRoute = require('./workspace').router;
const roomRoute = require('./room').router;

router.use('/', homeRoute);
router.use('/blogs', blogRoute);
router.use('/auth', authRoute);
router.use('/workspace', authenticate, workspaceRoute);
router.use('/room', authenticate, roomRoute);

module.exports = {
    router,
};
