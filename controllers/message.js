const Model = require('../models/message');
const Room = require('../models/room');
const User = require('../models/user');
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

            return res.status(200).send(result);
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(406).send({
                    message: 'Please enter proper Room ID',
                });
            }

            console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });

    Model.find({})
        .then((result) => res.send(result))
        .catch((err) => {
            console.log(err);
            res.send({ message: 'Internal Server Error' });
        });
};

const message_post = async ({ msg, room, user, socket }) => {
    if ((!msg, !room, !user)) {
        console.log('Please provide proper details');
        socket.emit('message-error', 'Please provide proper details');
        return;
    }

    // User validation
    const token = user;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        console.log(decodedToken);
        socket.emit('message-error', 'User not properly authenticated');
        return;
    }

    // let fromUser = {};
    User.findOne({ _id: decodedToken._id })
        .then((result) => {
            if (!result) {
                console.log('User not found');
                socket.emit('message-error', 'User not properly authenticated');
                return;
            }
            // fromUser = result;
        })
        .catch((e) => {
            console.log(e);
            socket.emit('message-error', 'User not properly authenticated');
            return;
        });

    // Room Validation
    Room.findOne({ _id: room })
        .then((result) => {
            if (!result) {
                console.log('Room not found');
                socket.emit('message-error', 'Room not found');
                return;
            }
        })
        .catch((e) => {
            console.log(e);
            socket.emit('message-error', 'Room not found');
            return;
        });

    const message = new Model({
        text: msg,
        room: room,
        user: decodedToken._id,
    });
    let newMessage = {};
    await message
        .save()
        .then((result) => {
            console.log(result);

            newMessage = result;
        })
        .catch((err) => {
            console.log(err);
            socket.emit('message-error', `${err}`);
            return;
        });

    // newMessage.user = fromUser;
    global.io.emit('newMessage', newMessage);
};

module.exports = {
    message_get_all,
    message_post,
};
