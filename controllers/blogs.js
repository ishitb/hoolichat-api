const Blog = require('../models/blog');
const faker = require('faker');

const Model = Blog;

const blog_get_all = (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.produces = ['application/json']

    Model.find()
        .then((result) => res.send(result))
        .catch((err) => {
            global.console.log(err);
            res.send({ message: 'Internal Server Error' });
        });
};

const blog_add = (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.produces = ['application/json']

    const blog = new Model(req.body);
    blog.save()
        .then((result) => {
            global.console.log(result);
            res.send(result);
        })
        .catch((err) => {
            global.console.log(err);
            res.send({ message: 'internal Server Error' });
        });
};

const blog_add_test = (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.produces = ['application/json']

    const blog = new Model({
        title: faker.name.title(),
        snippet: faker.hacker.phrase(),
        body: faker.lorem.paragraph(),
    });
    blog.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            global.console.log(err);
            res.send({ message: 'internal Server Error' });
        });
};

const blog_get_one = (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.produces = ['application/json']

    const id = req.params.id;
    global.console.log(id);
    Model.findById(id)
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            global.console.log(err);
            res.send({ message: 'internal Server Error' });
        });
};

const blog_delete = (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.produces = ['application/json']

    Model.findByIdAndDelete(req.params.id)
        .then((result) => res.send({ message: `${req.params.id} Deleted!` }))
        .catch((err) => {
            global.console.log(err);
            res.send({ message: 'internal Server Error' });
        });
};

const blog_update = (req, res) => {
    // #swagger.tags = ['Blogs']
    // #swagger.produces = ['application/json']

    const id = req.params.id;

    Model.updateOne({ _id: id }, req.body, (err) => global.console.log(err))
        .then((result) => res.send(result.n > 0))
        .catch((err) => {
            global.console.log(err);
            res.send({ message: 'internal Server Error' });
        });
};

module.exports = {
    blog_get_all,
    blog_add,
    blog_add_test,
    blog_get_one,
    blog_delete,
    blog_update,
};
