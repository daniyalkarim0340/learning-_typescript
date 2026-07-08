import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import Authrouter from "./routes/auth.routes.js";
import ProductRouter from "./routes/product.routes.js";
import ErrorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    error: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", Authrouter);
app.use("/api/products", ProductRouter);

// Error Middleware (Must be last)
app.use(ErrorMiddleware);

export default app;