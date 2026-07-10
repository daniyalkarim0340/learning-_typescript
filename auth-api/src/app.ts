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
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:5173/"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true // Required for HTTP-only cookies / refresh-tokens
}));

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