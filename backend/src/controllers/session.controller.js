import { Session } from "../models/session.model.js";

const publishSession = async (req, res) => {
    const userId = req.user?._id;
    const { title, tags, json_file_url } = req.body;
    const sessionId = req.body.sessionId;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }

    if (!title || !json_file_url) {
        return res.status(400).json({
            success: false,
            message: "Title and JSON file URL are required",
        });
    }

    try {
        let session;
        if (!sessionId) {
            session = await Session.create({
                user_id: userId,
                title,
                tags: tags || [],
                json_file_url,
                status: "published",
            });
        } else {
            session = await Session.findOneAndUpdate(
                { _id: sessionId, user_id: userId },
                { title, tags: tags || [], json_file_url, status: "published" },
                { new: true }
            );
        }

        if (!session) {
            return res.status(500).json({
                success: false,
                message: "Failed to publish session",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Session published successfully",
            data: session,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while publishing session",
        });
    }
};

const saveDraftSession = async (req, res) => {
    const userId = req.user?._id;
    const { title, tags, json_file_url } = req.body;
    const sessionId = req.body.sessionId;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }

    if (!title || !json_file_url) {
        return res.status(400).json({
            success: false,
            message: "Title and JSON file URL are required",
        });
    }

    try {
        let session;
        if (!sessionId) {
            session = await Session.create({
                user_id: userId,
                title,
                tags: tags || [],
                json_file_url,
                status: "draft",
            });
        } else {
            session = await Session.findOneAndUpdate(
                { _id: sessionId, user_id: userId },
                { title, tags: tags || [], json_file_url, status: "draft" },
                { new: true }
            );
        }

        if (!session) {
            return res.status(500).json({
                success: false,
                message: "Failed to save draft session",
            });
        }

        return res.status(201).json({
            success: true,
            message: "Draft session saved successfully",
            data: session,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while saving draft session",
        });
    }
};

const getMySessions = async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }

    try {
        const sessions = await Session.find({ user_id: userId });

        return res.status(200).json({
            success: true,
            message: "Sessions fetched successfully",
            data: sessions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching sessions",
        });
    }
};

const getMySessionById = async (req, res) => {
    const userId = req.user?._id;
    const sessionId = req.params.id;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }

    if (!sessionId) {
        return res.status(400).json({
            success: false,
            message: "Session ID is required",
        });
    }

    try {
        const session = await Session.findOne({
            _id: sessionId,
            user_id: userId,
        });

        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Session fetched successfully",
            data: session,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching session",
        });
    }
};

const getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find({ status: "published" });

        return res.status(200).json({
            success: true,
            message: "All published sessions fetched successfully",
            data: sessions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while fetching all sessions",
        });
    }
};

export {
    publishSession,
    saveDraftSession,
    getMySessions,
    getMySessionById,
    getAllSessions,
};
