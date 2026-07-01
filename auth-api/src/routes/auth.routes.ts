import { Router } from "express";
import { LoginUser, refreshAccessToken, register } from "../controllers/auth.controller.js";


const Authrouter = Router();
// Register route
Authrouter .post("/register", register);
Authrouter.post("/login", LoginUser);
Authrouter.post("/refresh-token", refreshAccessToken);


export default Authrouter;