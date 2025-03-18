const { imageUploadUtils } = require("../../helpers/cloudinary");


const handleImageUpload = async (req,res)=>{
    try{

        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = "data:"+ req.file.mimetype +";base64," + b64; 
        const result  = await imageUploadUtils(url);

        res.json({
            success : true,
            result,
        })

    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message:'Error Occured'
        })
    }
}

module.exports = {handleImageUpload}