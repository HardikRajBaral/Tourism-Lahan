import express from "express";
import { authLimiter } from "../../lib/limiter";
import { createUser, loginUser,logoutUser } from "../contorller/user.controller";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { createUserSchema, loginUserSchema } from "../../lib/validator";


const router= express.Router()

router.use(authLimiter)

router.post("/register", validationMiddleware(createUserSchema), createUser)
router.post("/login", validationMiddleware(loginUserSchema), loginUser)
router.post("/logout", logoutUser)

export default router