import { Router } from "express";

import { runValidation } from "../validations/index.js";
import { categoryValidator } from "../validations/category.js";
import { createCategory, updateCategory, getCategory, deleteCategory, getCategories } from "../controllers/category.js";

const categoryRoute = Router();



categoryRoute.post("/", createCategory);
categoryRoute.get("/:slug", getCategory);
categoryRoute.get("/", getCategories);
categoryRoute.put("/:slug", updateCategory);
categoryRoute.delete("/:slug", deleteCategory);



export default categoryRoute;