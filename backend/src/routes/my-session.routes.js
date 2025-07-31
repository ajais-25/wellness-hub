import express from "express";
import {
    publishSession,
    saveDraftSession,
    getMySessions,
    getMySessionById,
} from "../controllers/session.controller.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authenticateUser);

router.get("/", getMySessions);
router.get("/:id", getMySessionById);
router.post("/save-draft", saveDraftSession);
router.post("/publish", publishSession);

export default router;
