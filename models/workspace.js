const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workspaceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        organizer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Workspace = mongoose.model('Workspace', workspaceSchema);

module.exports = Workspace;
