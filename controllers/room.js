const { request, response } = require('express');

const Room = require('../models/room');
const User = require('../models/user');
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
 * TODO: complete controller
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

    Model.updateOne(
        { _id: id, organizer: decodedToken._id },
        { $push: { users: req.body.user } },
        (err) => console.log(err),
    )
        .then((result) => {
            res.status(200).send(result.n > 0);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).send({ message: 'Internal Server Error' });
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
