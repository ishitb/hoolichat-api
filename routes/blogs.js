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

router.post('/', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            console.log(result);
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.send({ message: 'internal Server Error' });
        });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log(id);
    Blog.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
            res.send({ message: 'internal Server Error' });
        });
});

router.delete('/:id', (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then((result) => res.send({ message: `${req.params.id} Deleted!` }))
        .catch((err) => {
            console.log(err);
            res.send({ message: 'internal Server Error' });
        });
});

router.patch('/:id', (req, res) => {
    const id = req.params.id;

    Blog.updateOne({ _id: id }, req.body, (err) => console.log(err))
        .then((result) => res.send(result.n > 0))
        .catch((err) => {
            console.log(err);
            res.send({ message: 'internal Server Error' });
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
