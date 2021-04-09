const router = require('express').Router();

router.get('/', (req, res) => {
    res.send({ message: 'Welcome to HooliChat API' });
});

module.exports = {
    router,
};
