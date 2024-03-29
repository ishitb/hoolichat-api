const router = require('express').Router();

const blogController = require('../controllers/blogs');

router.get('/', blogController.blog_get_all);

router.post('/', blogController.blog_add);

router.get('/test', blogController.blog_add_test);

router.get('/:id', blogController.blog_get_one);

router.delete('/:id', blogController.blog_delete);

router.patch('/:id', blogController.blog_update);

module.exports = {
    router,
};
