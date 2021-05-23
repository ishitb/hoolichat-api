const Model = require('../models/user');
const utils = require('../utils/auth');
const cloudinaryUtil = require('../utils/cloudinary');

const auth_register = async (req, res) => {
    const details = req.body;

    // Generating avatar
    const avatarURL = await utils.avatarURLGenerator(details.full_name);
    const imageURL = await cloudinaryUtil.uploadImage(avatarURL, details.phone);
    details.image = imageURL;

    Model.create(details)
        .then((user) => {
            const {
                email,
                _id,
                full_name,
                phone,
                description,
                username,
                image,
            } = user;
            const userInfo = {
                _id,
                email,
                full_name,
                phone,
                description,
                username,
                image,
            };

            const token = utils.createToken(userInfo);

            return res.status(201).send({
                message: 'Successfully registered!',
                token,
                userInfo,
            });
        })
        .catch((err) => {
            const { errCode, errors } = utils.handleErrors(err);
            return res.status(errCode).send({ errors });
        });
};

const auth_login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Model.login(email, password);
        const userInfo = {
            _id: user._id,
            email: user.email,
            full_name: user.full_name,
            phone: user.phone,
            description: user.description,
            username: user.username,
            image: user.image,
        };

        const token = utils.createToken(userInfo);

        return res.status(202).send({
            message: 'Successfully Logged In!',
            token,
            userInfo,
        });
    } catch (err) {
        const { errCode, errors } = utils.handleErrors(err);
        return res.status(errCode).send({ errors });
    }
};

module.exports = {
    auth_login,
    auth_register,
};
