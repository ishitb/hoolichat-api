const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        desciption: {
            type: String,
        },
        workspace: {
            type: Schema.Types.ObjectId,
            ref: 'Workspace',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;