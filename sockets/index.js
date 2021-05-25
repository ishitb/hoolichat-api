const socketio = require('socket.io');

const messageMethods = require('../controllers/message');

const socketConnection = async (server) => {
    global.io = socketio(server, {
        cors: {
            origin: '*',
        },
    });

    global.io.on('connection', (socket) => {
        socket.emit('test-message', 'Hello');

        socket.on('disconnect', (skt) => {
            global.io.emit('disconneced', { skt });
        });

        socket.on('test', details => {
            console.log(details)
        })

        socket.on('post-message', (socketDetails) => {
            messageMethods.message_post({
                msg: socketDetails.msg,
                room: socketDetails.room,
                user: socketDetails.user,
                socket: socket,
            });
        });
    });
};

module.exports = {
    socketConnection,
};
