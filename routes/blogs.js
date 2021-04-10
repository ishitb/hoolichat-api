const Blog = require('../models/blog');
const router = require('express').Router();

router.get('/', (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err);
            res.send({ message: 'Internal Server Error' });
        });
});

router.get('/add', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'about my new blog',
        body: 'more about my new blog',
    });

    blog.save()
        .then((resp) => {
            res.send(resp);
        })
        .catch((err) => {
            console.log(err);
            res.send({ message: 'Internal Server Error' });
        });
});

module.exports = {
    router,
};
