const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios').default;

const config = require('../config');

const handleErrors = (err) => {
    let errCode = 406,
        errors = { email: '', password: '' };

    // Email doesn't exist
    if (err.message === 'User with this email address does not exist') {
        errors.email = 'User with this email address does not exist';
        errCode = 404;
    }

    // incorrect password
    if (err.message === 'Incorrect Password') {
        errors.password = 'The Password is incorrect';
        errCode = 417;
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'User with this email address already exists';
        errCode = 409;
        return { errCode, errors };
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return { errCode, errors };
};

const createToken = (user) => {
    const token = jwt.sign(user, config.jwt.secret, {
        expiresIn: config.jwt.expiry,
        algorithm: config.jwt.algorithm,
    });

    return token;
};

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Generate a salt at level 12 strength
        bcrypt.genSalt(12, (err, salt) => {
            if (err) {
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

const verifyPassword = (passwordAttempt, hashedPassword) => {
    return bcrypt.compare(passwordAttempt, hashedPassword);
};

const decodeToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, config.jwt.secret);
        const user_info = decodedToken;

        return { ...user_info, status: 200 };
    } catch (err) {
        global.console.log(err);
        return { message: 'Invalid Token!', status: 400 };
    }
};

const avatarURLGenerator = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name,
    )}&background=random&bold=true`;
};

module.exports = {
    handleErrors,
    createToken,
    hashPassword,
    verifyPassword,
    decodeToken,
    avatarURLGenerator,
};
