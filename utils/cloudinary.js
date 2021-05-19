const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = require('../config').cloudinary;

const uploadImage = async (imageFile, imageID) => {
    cloudinary.config(cloudinaryConfig);
    const uploadedImage = await cloudinary.uploader.upload(imageFile, {
        public_id: imageID,
    });

    return uploadedImage.secure_url;
};

module.exports = { uploadImage };
