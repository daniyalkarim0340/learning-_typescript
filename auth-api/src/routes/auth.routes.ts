import { Router } from "express";
import { register } from "../controllers/auth.controller.js";


const Authrouter = Router();

// Register route
Authrouter .post("/register", register);

export default Authrouter;