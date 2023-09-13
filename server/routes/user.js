import { Router } from "express";

import { registerUser, activateAccount } from "../controllers/user.js";
import { registrationValidator } from "../validations/user.js";
import { runValidation } from "../validations/index.js";

const userRoute = Router();

// register route

userRoute.post("/register", registrationValidator, runValidation, registerUser);
userRoute.post("/account-activation", activateAccount);


export default userRoute;