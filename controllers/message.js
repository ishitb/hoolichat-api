const Model = require('../models/message');
const Room = require('../models/room');
const authUtils = require('../utils/auth');

const message_get_all = async (req, res) => {
    const token = req.headers.authorization;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        res.status(401).send({ message: decodedToken.message });
        return;
    }

    const user = decodedToken;
    const roomID = req.body.roomID;

    Room.findById(roomID)
        .then((room) => {
            if (!room) {
                res.status(404).send({
                    message: 'Room with this ID not found',
                });
                return;
            }

            if (!room.users.includes(user._id)) {
                res.status(401).send({
                    message: 'User not authorized to load these messages',
                });
                return;
            }

            Model.find({ room: roomID })
                .then((result) => {
                    res.send(result);
                })
                .catch((err) => {
                    console.log(err);
                    res.send({ message: 'Internal Server Error' });
                });

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

    Model.find({})
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err);
            res.send({ message: 'Internal Server Error' });
        });
};

module.exports = {
    message_get_all,
};
