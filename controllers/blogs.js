const Blog = require('../models/blog');

const Model = Blog;

const blog_get_all = (req, res) => {
    Blog.find()
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err);
            res.send({ message: 'Internal Server Error' });
        });
};

const blog_add = (req, res) => {
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
};

const blog_get_one = (req, res) => {
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
};

const blog_delete = (req, res) => {
    Blog.findByIdAndDelete(req.params.id)
        .then((result) => res.send({ message: `${req.params.id} Deleted!` }))
        .catch((err) => {
            console.log(err);
            res.send({ message: 'internal Server Error' });
        });
};

module.exports = {
    blog_get_all,
    blog_add,
    blog_get_one,
};
