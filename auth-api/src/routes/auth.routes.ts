import { Router } from "express";
import { LoginUser, register } from "../controllers/auth.controller.js";


const Authrouter = Router();

// Register route
Authrouter .post("/register", register);
Authrouter.post("/login", LoginUser);


export default Authrouter;