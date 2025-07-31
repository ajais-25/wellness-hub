import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

app.use(
    cors({
        origin: process.env.CORS,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRoutes from "./routes/user.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import mysessionRoutes from "./routes/my-session.routes.js";

// Routes setup
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/sessions", sessionRoutes);
app.use("/api/v1/my-sessions", mysessionRoutes);

export default app;
