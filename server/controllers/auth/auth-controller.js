const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// Register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (checkUser) {
            return res.status(400).json({  // ⬅️ FIXED: Added status 400
                success: false,
                message: "User already exists with this email. Please try again.",
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ userName, email, password: hashPassword });

        await newUser.save();
        res.status(201).json({  // ⬅️ FIXED: Changed to 201 (Created)
            success: true,
            message: "Registration Successful",
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "An error occurred. Please try again.",
        });
    }
};

// Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.status(401).json({  // ⬅️ FIXED: Added 401 status
                success: false,
                message: "User does not exist! Please register first.",
            });
        }

        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(401).json({  // ⬅️ FIXED: Changed 200 → 401
                success: false,
                message: "Incorrect password! Please try again.",
            });
        }

        const token = jwt.sign(
            { id: checkUser._id, role: checkUser.role, email: checkUser.email },
            "CLIENT_SECRET_KEY",
            { expiresIn: "60m" }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // ⬅️ FIXED: Secure cookies in production
            sameSite: "Strict", // ⬅️ FIXED: Prevents CSRF attacks
            expires: new Date(Date.now() + 60 * 60 * 1000), // ⬅️ FIXED: Sets cookie expiration
        }).json({
            success: true,
            message: "Logged in successfully!",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
            },
        });
    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false,
            message: "An error occurred. Please try again.",
        });
    }
};

// Logout
const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0), // ⬅️ FIXED: Expire the cookie immediately
    }).json({
        success: true,
        message: "Logged out successfully!",
    });
};

// Auth Middleware
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user! No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized user! Invalid or expired token.",
        });
    }
};

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
