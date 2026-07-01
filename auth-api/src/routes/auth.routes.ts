import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const Authrouter = Router();
// Register route
Authrouter .post("/register", register);
Authrouter.post("/login", loginUser);
Authrouter.post("/refresh-token", refreshAccessToken);
Authrouter.post("/logout",authMiddleware, logoutUser); // Add this line to handle logout

export default Authrouter;