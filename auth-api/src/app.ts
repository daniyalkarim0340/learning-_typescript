import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import Authrouter from "./routes/auth.routes.js";
import ErrorMiddleware from "./middleware/error.middleware.js";
import ProductRouter from "./routes/product.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // ✅ MUST come before routes

// Routes
app.use("/api", Authrouter);
app.use("/api/products", ProductRouter); // Add this line to handle product routes
// Error middleware (MUST be last)
app.use(ErrorMiddleware);

export default app;