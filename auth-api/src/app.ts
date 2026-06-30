import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Authrouter from "./routes/auth.routes.js";
import ErrorMiddleware from "./middleware/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api",Authrouter)
app.use(ErrorMiddleware)
export default app;