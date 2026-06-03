import express from "express";
import { authLimiter } from "../../lib/limiter";
import { createuser, loginuser, logoutuser, refreshuser } from "../contorller/user.contorller";
import { validationMiddleware } from "../middleware/validationMiddleware";
import { createUserSchema, loginUserSchema } from "../../lib/validator";

const router= express.Router()

router.use(authLimiter)

router.post("/register", validationMiddleware(createUserSchema), createuser)
router.post("/login", validationMiddleware(loginUserSchema), loginuser)
router.post("/refresh", refreshuser)
router.post("/logout", logoutuser)

export default router