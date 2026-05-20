const userModel = require("../Model/User.Model");
const bcrypt = require("bcryptjs");
const generateToken = require("../Utils/GenerateToken");

const cookiesOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 2 * 60 * 60 * 1000,
};

const RegisterController = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "All fields are required",
            });
        }

        const existingUser = await userModel.findOne({
            email,
        });

        if (existingUser) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });

        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
        };

        return res.status(201).json({
            error: false,
            success: true,
            message: "User registered successfully",
            data: userData,
        });
    } catch (error) {
        next(error);
    }
};

const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: true,
                success: false,
                message: "Email and password required",
            });
        }

        const userexist = await userModel.findOne({ email }).select("+password");

        if (!userexist) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "Invalid credentials",
            });
        }

        const comparepassword = await bcrypt.compare(password, userexist.password);

        if (!comparepassword) {
            return res.status(401).json({
                error: true,
                success: false,
                message: "Invalid credentials",
            });
        }

        const userToken = {
            _id: userexist._id,
            email: userexist.email,
        };

        const token = await generateToken(userToken);

        res.cookie("token", token, cookiesOptions);

        const userData = {
            _id: userexist._id,
            name: userexist.name,
            email: userexist.email,
        };

        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: userData,
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

const logoutController = async (req, res, next) => {
    try {

        const { id } = req.params;
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                error: true,
                success: false,
                message: "User not found",
            });
        }

        await res.clearCookie("token");
        return res.status(200).json({
            error: false,
            success: true,
            message: "Logout successful",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    RegisterController,
    loginController,
    logoutController,
};
