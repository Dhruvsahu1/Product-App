const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

//register

const registerUser = async (req,res)=>{
    const {userName , email , password } = req.body;

    try{
        const checkUser = await User.findOne({email});
        if(checkUser){
            return res.json({
                success:false,
                message:"User Already exist with the same email please Try Again",
            })
        }
        const hashPassword = await bcrypt.hash(password,12);
        const newUser = new User({
            userName , email , password : hashPassword
        })

        await newUser.save();
        res.status(200).json({
            success : true,
            message : "Registration Successful"
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message : "Some error Occured"
        })
    }
}
//login

const loginUser  = async (req,res) =>{
    const {email , password} = req.body;
    try{
        const checkUser = await User.findOne({email});
        if(!checkUser){
            return res.json({
                success:false,
                message:`User doesn't exist! please register first`
            })
        }
        const checkpassword = await bcrypt.compare(password,checkUser.password);
        if(!checkpassword){
            return res.status(200).json({
                success: false,
                message:`Incorrect password! please try again`
            })
        }
        const token = jwt.sign({
            id:checkUser._id,role: checkUser.role,email:checkUser.email
        },'CLIENT_SECRET_KEY',{expiresIn: '60m'})

        res.cookie ('token',token,{httpOnly:true,secure:false}).json({
            success:true,
            message:`Logged in Succesfully!`,
            user:{
                email: checkUser.email,
                role:checkUser.role,
                id:checkUser._id,
            }
        })
    }
    catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message : "Some error Occured"
        })
    }
}



module.exports = {registerUser,loginUser}