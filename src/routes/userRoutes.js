import { Router } from "express";
import validateJwt from "../controller/auth/validateJwt.js";
import loginUser from "../controller/user/login.js";
import registerUser from "../controller/user/register.js";

const userRouter = Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", loginUser)
userRouter.post("/", validateJwt)

export default userRouter;