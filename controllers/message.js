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
    let since = req.body.since;

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

            Model.find({
                room: roomID,
                createdAt: since
                    ? { $gte: new Date(Number(since)) }
                    : { $lte: new Date() },
            })
                .then((result) => {
                    return res.send(result);
                })
                .catch((err) => {
                    global.console.log(err);
                    return res.send({ message: 'Internal Server Error' });
                });
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                res.status(406).send({
                    message: 'Please enter proper Room ID',
                });
            }

            global.console.log(err);
            return res.status(400).send({ message: 'Internal Server Error' });
        });
};

const message_post = async ({ msg, room, user, socket }) => {
    if ((!msg, !room, !user)) {
        global.console.log('Please provide proper details');
        socket.emit('message-error', 'Please provide proper details');
        return;
    }

    // User validation
    const token = user;
    const decodedToken = authUtils.decodeToken(token);
    if (decodedToken.status === 400) {
        global.console.log(decodedToken);
        socket.emit('message-error', 'User not properly authenticated');
        return;
    }

    // let fromUser = {};
    User.findOne({ _id: decodedToken._id })
        .then((result) => {
            if (!result) {
                global.console.log('User not found');
                socket.emit('message-error', 'User not properly authenticated');
                return;
            }
            // fromUser = result;
        })
        .catch((e) => {
            global.console.log(e);
            socket.emit('message-error', 'User not properly authenticated');
            return;
        });

    // Room Validation
    Room.findOne({ _id: room })
        .then((result) => {
            if (!result) {
                global.console.log('Room not found');
                socket.emit('message-error', 'Room not found');
                return;
            }
        })
        .catch((e) => {
            global.console.log(e);
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
            global.console.log(result);

            newMessage = result;
        })
        .catch((err) => {
            global.console.log(err);
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
