const router = require('express').Router();

const homeRoute = require('./home').router;
const blogRoute = require('./blogs').router;
const authRoute = require('./auth').router;

router.use('/', homeRoute);
router.use('/blogs', blogRoute);
router.use('/auth', authRoute);

module.exports = {
    router,
};
