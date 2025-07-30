import { User } from "../models/user.model.js";

const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    // Validation patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Validate email format
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Please enter a valid email address",
        });
    }

    // Validate name - no special characters
    if (specialCharRegex.test(name)) {
        return res.status(400).json({
            success: false,
            message: "Name should not contain special characters",
        });
    }

    // Validate password - no special characters
    if (specialCharRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: "Password should not contain special characters",
        });
    }

    // Additional validation for minimum lengths
    if (name.trim().length < 2) {
        return res.status(400).json({
            success: false,
            message: "Name must be at least 2 characters long",
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters long",
        });
    }

    if (password.length > 50) {
        return res.status(400).json({
            success: false,
            message: "Password must not exceed 50 characters",
        });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
        });

        const user = await User.findById(newUser._id).select("-password -__v");

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User registration failed",
            });
        }

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required",
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist",
            });
        }

        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = user.generateAuthToken();

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                token,
            },
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
    });

    res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
};

const getCurrentUser = async (req, res) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User not authenticated",
        });
    }

    res.status(200).json({
        success: true,
        data: user,
    });
};

export { register, login, logout, getCurrentUser };
