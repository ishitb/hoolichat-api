const router = require('express').Router();

router.get('/', (req, res) => {
    // res.send({ message: 'Welcome to HooliChat API' });
    res.render('index', { title: 'HooliChat API v1.0.1' });
});

module.exports = {
    router,
};
