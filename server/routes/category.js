import { Router } from "express";

import { runValidation } from "../validations/index.js";
import { categoryValidator } from "../validations/category.js";
import { createCategory } from "../controllers/category.js";

const categoryRoute = Router();



categoryRoute.post("/", createCategory);


export default categoryRoute;