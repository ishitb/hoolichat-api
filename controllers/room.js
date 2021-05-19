const { request, response } = require('express');

const Room = require('../models/room');
const Workspace = require('../models/workspace');
const authUtils = require('../utils/auth');

const Model = Room;

const room_get_all = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    try {
        workspace = req.body.workspace;
    } catch {
        res.status(406).send({ message: 'Please provide a workspace ID' });
        return;
    }

    Model.find({ workspace: workspace, users: decodedToken._id })
        .then((result) => res.status(200).send(result))
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const room_add = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const room = new Model({
        organizer: decodedToken._id,
        ...req.body,
        users: [decodedToken._id],
    });

    room.save()
        .then((result) => {
            console.log(result);
            res.status(201).send(result);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const room_get_one = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const id = req.params.id;

    Model.findById(id)
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: 'Room with this ID not found',
                });
                return;
            }

            res.status(200).send(result);
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(406).send({
                    message: 'Please enter proper Room ID',
                });
            }

            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const room_delete = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    Model.findOneAndDelete({ _id: req.params.id, organizer: decodedToken._id })
        .then((result) =>
            res.status(200).send({
                message: `${req.params.id} - ${result.name} Deleted!`,
            }),
        )
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

const room_update = (req, res) => {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        return res.status(401).send({ message: decodedToken.message });
    }

    const id = req.params.id;

    Model.updateOne({ _id: id }, req.body, (err) => console.log(err))
        .then((result) => {
            res.status(200).send(result.n > 0);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
        });
};

/**
 * @param {request} req
 * @param {response} res
 */
const room_add_user = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const id = req.params.id;
    const newUser = req.body.newUser;

    Model.findById(id)
        .then(async (result) => {
            // Workspace not found
            if (!result) {
                res.status(404).send({ message: 'Workspace not found' });
                return;
            }

            const workspaceID = result.workspace;
            Workspace.find({ _id: workspaceID })
                .then((workspace) => {
                    if (!workspace) {
                        res.status(400).send({
                            message: 'Internal Server Error',
                        });
                        return;
                    }

                    if (!workspace.users.includes(newUser)) {
                        res.status(401).send({
                            message:
                                "User not authorized in workspace. Can't add to room",
                        });
                        return;
                    }
                })
                .catch((e) => {
                    console.log(e);
                    res.status(400).send({ message: 'Internal Server Error' });
                    return;
                });

            // Checking if use already in workspace
            if (result.users.includes(newUser)) {
                res.status(409).send({ message: 'User already in Room' });
                return;
            }

            // Adding user to room
            result.users = [...result.users, newUser];
            result.save();

            return res.status(201).send({
                result,
                message: 'User added to room',
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

module.exports = {
    room_get_all,
    room_add,
    room_get_one,
    room_delete,
    room_update,
    room_add_user,
};
