const router = require('express').Router();

const homeRoute = require('./home').router;
const blogRoute = require('./blogs').router;

router.use('/', homeRoute);
router.use('/blogs', blogRoute);

module.exports = {
    router,
};
