import express from "express";
import { authLimiter } from "../lib/limiter";
import { createUser, loginUser,logoutUser, refreshAccessToken } from "../contorller/auth.controller";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { createUserSchema, loginUserSchema } from "../lib/validator";
import authenticate from "../middleware/authmiddleware";


const router= express.Router()

router.use(authLimiter)

router.post("/register", validationMiddleware(createUserSchema), createUser)
router.post("/login", validationMiddleware(loginUserSchema), loginUser)
router.post("/logout", authenticate, logoutUser)
router.post('/refresh', refreshAccessToken)
export default router