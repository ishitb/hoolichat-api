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
        expiry: 60 * 60 * 24 * 30, // 30 Days
        algorithm: 'HS256',
    },
    cloudinary: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    },
};
