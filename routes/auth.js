const router = require('express').Router();
const authController = require('../controllers/auth');

router.post('/signup', authController.auth_signup);
router.post('/signup', authController.auth_login);

module.exports = {
    router,
};
