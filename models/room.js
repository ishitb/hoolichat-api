const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        workspace: {
            type: Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true,
        },
        users: [
            {
                // type: Schema.Types.ObjectId,
                type: String,
                // ref: 'User',
                // unique: false,
            },
        ],
        restricted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
