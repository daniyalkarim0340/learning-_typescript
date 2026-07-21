import { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, getCategoryById } from "../controllers/category.controllar.js";

// Import your auth middlewares here if you have them, for example:
// import { protect, admin } from "../middleware/auth.middleware.js";

const Categoryrouter = Router();


Categoryrouter.route("/")
.get(getAllCategories)
.post(createCategory);
  
Categoryrouter.route("/:id")
.get(getCategoryById)
  .delete(deleteCategory);

export default Categoryrouter;