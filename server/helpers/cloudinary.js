const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dzdhrnqml',
    api_key : '464696594714352',
    api_secret : 'X77KPSIDsHdZRzanCzv0_SeYU58',
})

const storage = new multer.memoryStorage();

async function imageUploadUtils(file){
    const result = await cloudinary.uploader.upload(file,{
        resource_type : 'auto'
    })
    return result;
}

const upload = multer({storage})
module.exports = {upload, imageUploadUtils};