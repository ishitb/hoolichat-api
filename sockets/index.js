const socketio = require('socket.io');

const socketConnection = async (server) => {
    global.io = socketio(server);

    // TODO : 1. Create function to receive on 'postmessage' with params message, user and room
    // TODO : 2. Add to function to validate user and room
    // TODO : 3. Add function to emit message to all except user (post message to add message to db)

    /**
     * @param {socketio.Socket} socket
     */
    io.on('connection', (socket) => {
        socket.emit('message', 'Hello Bitches');
    });
};

module.exports = {
    socketConnection,
};
