module.exports = {
    port: global.process.env.PORT || 8000,
    db: {
        uri: global.process.env.MONGO_DB_URI || 'mongodb://localhost/HooliDB',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: global.process.env.JWT_SECRET || 'HooliChat Secret',
        expiry: 60 * 60 * 24 * 30, // 30 Days
        algorithm: 'HS256',
    },
    cloudinary: {
        cloud_name: global.process.env.CLOUDINARY_CLOUD_NAME,
        api_key: global.process.env.CLOUDINARY_API_KEY,
        api_secret: global.process.env.CLOUDINARY_API_SECRET,
    },
};
