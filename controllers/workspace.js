const { request, response } = require('express');

const Workspace = require('../models/workspace');
const Room = require('../models/room');
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

    Model.find({ users: decodedToken._id })
        .then((result) => res.status(200).send(result))
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

const workspace_add = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const workspace = new Model({
        organizer: decodedToken._id,
        ...req.body,
        users: [decodedToken._id],
    });

    workspace
        .save()
        .then((result) => {
            global.console.log(result);
            return res.status(201).send(result);
        })
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
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

    Model.findOne({ _id: id })
        .then(async (result) => {
            if (!result) {
                return res
                    .status(404)
                    .send({ message: 'Workspace not found!' });
            }

            let users = [];
            await User.find({ _id: { $in: [...result.users] } })
                .then((userResult) => {
                    users = userResult;
                })
                .catch((e) => {
                    global.console.log(e);
                });

            const userId = result.organizer;
            User.findById(userId)
                .then((user) => {
                    Room.find({ workspace: result._id })
                        .then((rooms) => {
                            return res.status(200).send({
                                _id: result._id,
                                organizer: user.full_name,
                                name: result.name,
                                createdAt: result.createdAt,
                                updatedAt: result.updatedAt,
                                rooms,
                                users,
                            });
                        })
                        .catch((err) => {
                            global.console.log(err);
                            res.status(400).send({
                                message: 'Internal Server Error',
                            });
                            return;
                        });
                })
                .catch((err) => {
                    global.console.log(err);
                    return res
                        .status(400)
                        .send({ message: 'Internal Server Error' });
                });
        })
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

const workspace_delete = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    Model.findById(req.params.id)
        .then((result) => {
            const userId = result.organizer;
            User.findById(userId)
                .then((user) => {
                    if (String(userId) !== String(decodedToken._id)) {
                        res.status(401).send({ message: 'Invalid Token!' });
                        return;
                    }
                })
                .catch((err) => {
                    global.console.log(err);
                    res.status(400).send({ message: 'Internal Server Error' });
                    return;
                });
        })
        .catch((err) => {
            global.console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
            return;
        });

    Model.findOneAndDelete({ _id: req.params.id, organizer: decodedToken._id })
        .then((result) => {
            Room.deleteMany({ workspace: result._id })
                .then((rooms) => {
                    global.console.log('Rooms deleted');
                })
                .catch((err) => {
                    global.console.log(err);
                    res.status(400).send({
                        message: 'Internal Server Error',
                    });
                    return;
                });

            return res.status(200).send({
                message: `${req.params.id} - ${result.name} Deleted!`,
            });
        })
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
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
                global.console.log(err);
                return res
                    .status(400)
                    .send({ message: 'Internal Server Error' });
            });
    });

    Model.updateOne({ _id: id, organizer: decodedToken._id }, req.body, (err) =>
        global.console.log(err),
    )
        .then((result) => {
            return res.status(200).send(result.n > 0);
        })
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

/**
 * @param {request} req
 * @param {response} res
 */
const workspace_add_user = async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const id = req.params.id;
    const newUser = decodedToken._id;

    Model.findById(id)
        .then((result) => {
            // Workspace not found
            if (!result) {
                res.status(404).send({ message: 'Workspace not found' });
                return;
            }

            // Checking if use already in workspace
            if (result.users.includes(newUser)) {
                res.status(409).send({ message: 'User already in Workspace' });
                return;
            }

            // Adding user to workspace
            result.users = [...result.users, newUser];
            result.save();

            // Adding user to unrestricted rooms
            Room.find({ workspace: result._id, restricted: false })
                .then((rooms) => {
                    if (!rooms) {
                        global.console.log('No unrestricted rooms');
                    } else {
                        rooms.forEach((room) => {
                            if (!room.users.inclues(newUser)) {
                                room.users = [...room.users, newUser];
                                room.save();
                            }
                        });
                    }
                })
                .catch((e) => {
                    global.console.log(e);
                    res.status(400).send({ message: 'Internal Server Error' });
                    return;
                });

            return res.status(201).send({
                result,
                message: 'User added to workspace and unrestricted rooms',
            });
        })
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

module.exports = {
    workspace_get_all,
    workspace_add,
    workspace_get_one,
    workspace_delete,
    workspace_update,
    workspace_add_user,
};
