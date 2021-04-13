const router = require('express').Router();

const { authenticate } = require('../middleware/auth');
const homeRoute = require('./home').router;
const blogRoute = require('./blogs').router;
const authRoute = require('./auth').router;
const workspaceRoute = require('./workspace').router;

router.use('/', homeRoute);
router.use('/blogs', blogRoute);
router.use('/auth', authRoute);
router.use('/workspace', authenticate, workspaceRoute);

module.exports = {
    router,
};
