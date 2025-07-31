import express from "express";
import { getAllSessions } from "../controllers/session.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getAllSessions);

export default router;
