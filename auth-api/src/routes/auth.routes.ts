import { Router } from "express";
import { loginUser, logoutUser, refreshAccessToken, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../zodvalidation/register.validation.js";


const Authrouter = Router();
// Register route
Authrouter .post("/register",validate(registerSchema), register);
Authrouter.post("/login", validate(loginSchema), loginUser);
Authrouter.post("/refresh-token", refreshAccessToken); // No validation - uses HttpOnly cookie
Authrouter.post("/logout",authMiddleware, logoutUser); // Add this line to handle logout

export default Authrouter;