module.exports = {
    port: process.env.PORT || 8000,
    db: {
        uri: process.env.MONGO_DB_URI || 'mongodb://localhost/HooliDB',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'HooliChat Secret',
        expiry: '30d',
        algorithm: 'HS256',
    },
};
