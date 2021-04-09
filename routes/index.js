const router = require('express').Router();

const homeRoute = require('./home').router;

router.use('/', homeRoute);

module.exports = {
    router,
};
