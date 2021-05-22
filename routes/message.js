const router = require('express').Router();

const messageController = require('../controllers/message');

router.get('/', messageController.message_get_all);

module.exports = {
    router,
};
