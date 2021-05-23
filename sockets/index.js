const socketio = require('socket.io');

const messageMethods = require('../controllers/message');

const socketConnection = async (server) => {
    global.io = socketio(server);

    /**
     * @param {socketio.Socket} socket
     */
    io.on('connection', (socket) => {
        socket.on('disconnect', (skt) => {
            global.io.emit('disconneced', { skt });
        });

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
