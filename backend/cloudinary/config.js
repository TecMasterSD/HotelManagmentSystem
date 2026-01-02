const cloudinary = require('cloudinary').v2;
const multer = require('multer')

cloudinary.config({
    cloud_name: "df3thahco",
    api_key: "571936767288124",
    api_secret: "iG_dGZkoOSiiTyFPOXa6KVQa3B0"
})

const Storage = new multer.memoryStorage({});

async function UploadImageOnCloudinary(file){
    const finalUploadImage = await cloudinary.uploader.upload(file, {
        resource_type: "auto"
    })
    return finalUploadImage;
}

const uploadStorage = multer({Storage});
module.exports = {uploadStorage, UploadImageOnCloudinary}