const Model = require('../models/room');
const Workspace = require('../models/workspace');

const addUser = async ({ roomID, newUser }) => {
    let status = {},
        message = {};

    await Model.findById(roomID)
        .then(async (result) => {
            // Workspace not found
            if (!result) {
                status = 404;
                message = 'Workspace not Found';
                return;
            }

            const workspaceID = result.workspace;
            Workspace.findOne({ _id: workspaceID })
                .then((workspace) => {
                    if (!workspace) {
                        status = 400;
                        message = 'Internal Server Error';
                        return;
                    }

                    if (!workspace.users.includes(newUser)) {
                        status = 401;
                        message =
                            "User not authorized in workspace. Can't add to room";
                        return;
                    }
                })
                .catch((e) => {
                    console.log(e);
                    status = 400;
                    message = 'Internal Server Error';
                    return;
                });

            // Checking if use already in workspace
            if (result.users.includes(newUser)) {
                status = 409;
                message = 'User already in Room';
                return;
            }

            // Adding user to room
            result.users = [...result.users, newUser];
            result.save();

            status = 201;
            message = 'User added to room';
        })
        .catch((err) => {
            console.log(err);
            status = 400;
            message = 'Internal Server Error';
        });

    console.log({ status, message });

    return { status, message };
};

module.exports = {
    addUser,
};
