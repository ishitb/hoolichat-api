const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        parent: {
            type: Schema.Types.ObjectId,
            ref: 'Message',
        },
    },
    {
        timestamps: true,
    },
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
