const express  = require('express');
const newLocal = require("../../controllers/auth/auth-controller");
const { registerUser, loginUser } = newLocal

const router = express.Router();

router.post("/register",registerUser)
router.post("/login",loginUser)


module.exports = router;