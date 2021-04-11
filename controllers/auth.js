const Model = require('../models/user');
const utils = require('../middleware/auth');

const auth_register = (req, res) => {
    const details = req.body;

    Model.create(details)
        .then((user) => {
            const { email, _id } = user;
            const userInfo = {
                _id,
                email,
            };

            const token = utils.createToken(userInfo);

            res.status(201).send({
                message: 'Successfully registered!',
                token,
                userInfo,
            });
        })
        .catch((err) => {
            const { errCode, errors } = utils.handleErrors(err);
            res.status(errCode).send({ errors });
        });
};

const auth_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Model.login(email, password);
        const userInfo = {
            _id: user._id,
            email: user.email,
        };

        const token = utils.createToken(userInfo);

        res.status(202).send({
            message: 'Successfully Logged In!',
            token,
            userInfo,
        });
    } catch (err) {
        const { errCode, errors } = utils.handleErrors(err);
        res.status(errCode).send({ errors });
    }
};

module.exports = {
    auth_login,
    auth_register,
};
