const express  = require('express');
const newLocal = require("../../controllers/auth/auth-controller");
const { registerUser, loginUser,logoutUser,authMiddleware } = newLocal

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/logout",logoutUser)
router.get('/check-auth',authMiddleware,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        message:`Authenticated User!`,
        user:req.user
    })
})


module.exports = router;