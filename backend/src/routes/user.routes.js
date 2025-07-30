import express from "express";
import {
    register,
    login,
    logout,
    getCurrentUser,
} from "../controllers/user.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.post("/logout", authenticateUser, logout);
router.get("/me", authenticateUser, getCurrentUser);

export default router;
