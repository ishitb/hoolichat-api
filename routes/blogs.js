const router = require('express').Router();

const blogController = require('../controllers/blogs');
const { authenticate } = require('../middleware/auth');

router.get('/', authenticate, blogController.blog_get_all);

router.post('/', blogController.blog_add);

router.get('/:id', blogController.blog_get_one);

router.delete('/:id', blogController.blog_delete);

router.patch('/:id', blogController.blog_update);

module.exports = {
    router,
};
