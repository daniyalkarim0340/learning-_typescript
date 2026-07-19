import { Router } from "express";
import { createCategory, deleteCategory } from "../controllers/category.controllar.js";

// Import your auth middlewares here if you have them, for example:
// import { protect, admin } from "../middleware/auth.middleware.js";

const Categoryrouter = Router();


    



Categoryrouter.route("/")
  .post(createCategory);

Categoryrouter.route("/:id")
  .delete(deleteCategory);

export default Categoryrouter;