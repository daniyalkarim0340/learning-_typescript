import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import Authrouter from "./routes/auth.routes.js";
import ErrorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // ✅ MUST come before routes

// Routes
app.use("/api", Authrouter);

// Error middleware (MUST be last)
app.use(ErrorMiddleware);

export default app;