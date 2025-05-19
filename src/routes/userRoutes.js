import { Router } from "express";
import loginUser from "../controller/user/login.js";
import registerUser from "../controller/user/register.js";

const userRouter = Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)

export default userRouter;