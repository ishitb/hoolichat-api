const auth_signup = (req, res) => {
    res.send({ message: 'Testing' });
};

const auth_login = (req, res) => {};

module.exports = {
    auth_login,
    auth_signup,
};
