const Workspace = require('../models/workspace');
const User = require('../models/user');
const authUtils = require('../utils/auth');

const Model = Workspace;

const workspace_get_all = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    Model.find({ organizer: decodedToken._id })
        .then((result) => res.status(200).send(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const workspace_add = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const workspace = new Model({ organizer: decodedToken._id, ...req.body });

    workspace
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const workspace_get_one = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const id = req.params.id;

    Model.findById(id)
        .then((result) => {
            const userId = result.organizer;
            User.findById(userId)
                .then((user) => {
                    if (String(userId) !== String(decodedToken._id)) {
                        res.status(401).send({ message: 'Invalid Token!' });
                        return;
                    }

                    res.status(200).send({
                        _id: result._id,
                        organizer: user.full_name,
                        name: result.name,
                        createdAt: result.createdAt,
                        updatedAt: result.updatedAt,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send({ message: 'Internal Server Error' });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const workspace_delete = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            const userId = result.organizer;
            User.findById(userId)
                .then((user) => {
                    if (String(userId) !== String(decodedToken._id)) {
                        res.status(401).send({ message: 'Invalid Token!' });
                        return;
                    }

                    res.status(200).send({
                        message: `${req.params.id} - ${result.name} Deleted!`,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400).send({ message: 'Internal Server Error' });
                });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const workspace_update = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const id = req.params.id;

    Model.findById(id).then((result) => {
        const userId = result.organizer;
        User.findById(userId)
            .then((user) => {
                if (String(userId) !== String(decodedToken._id)) {
                    res.status(401).send({ message: 'Invalid Token!' });
                    return;
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(400).send({ message: 'Internal Server Error' });
            });
    });

    Model.updateOne({ _id: id }, req.body, (err) => console.log(err))
        .then((result) => {
            res.status(200).send(result.n > 0);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

module.exports = {
    workspace_get_all,
    workspace_add,
    workspace_get_one,
    workspace_delete,
    workspace_update,
};
