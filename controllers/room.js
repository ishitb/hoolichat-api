const { request, response } = require('express');

const Room = require('../models/room');
const Workspace = require('../models/workspace');
const authUtils = require('../utils/auth');
const roomUtils = require('../utils/rooms');

const Model = Room;

const room_get_all = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    let workspace = '';

    try {
        workspace = req.body.workspace;
    } catch {
        res.status(406).send({ message: 'Please provide a workspace ID' });
        return;
    }

    Model.find({ workspace: workspace, users: decodedToken._id })
        .then((result) => res.status(200).send(result))
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

const room_add = (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const workspaceID = req.body.workspace;
    Workspace.findOne({ _id: workspaceID })
        .then((workspace) => {
            if (!workspace) {
                res.status(404).send({ message: 'Workspace not found!' });
                return;
            }

            if (workspace.organizer != decodedToken._id) {
                res.status(401).send({
                    message: 'User not authorized to add room',
                });
                return;
            }

            const restricted = req.body.restricted;

            let room = null;
            if (restricted) {
                room = new Model({
                    organizer: decodedToken._id,
                    ...req.body,
                    users: [decodedToken._id],
                });
            } else {
                room = new Model({
                    organizer: decodedToken._id,
                    ...req.body,
                    users: [...workspace.users],
                });
            }

            room.save()
                .then((result) => {
                    return res.status(201).send(result);
                })
                .catch((err) => {
                    global.console.log(err);
                    return res
                        .status(400)
                        .send({ message: 'Internal Server Error' });
                });
            return;
        })
        .catch((err) => {
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
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

            return res.status(200).send(result);
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                return res.status(406).send({
                    message: 'Please enter proper Room ID',
                });
            }

            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
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
            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

const room_update = (req, res) => {
    const token = req.headers.authorization;
    global.console.log(token);
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        return res.status(401).send({ message: decodedToken.message });
    }

    const id = req.params.id;

    Model.updateOne({ _id: id }, req.body, (err) => global.console.log(err))
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
const room_add_user = async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const id = req.params.id;
    const newUser = req.body.newUser;

    const { status, message } = await roomUtils.addUser({
        roomID: id,
        newUser,
    });

    return res.status(status).send(message);
};

module.exports = {
    room_get_all,
    room_add,
    room_get_one,
    room_delete,
    room_update,
    room_add_user,
};
