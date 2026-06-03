import express from "express";
import { authLimiter } from "../../lib/limiter";
import { createuser, loginuser, logoutuser } from "../contorller/user.contorller";

const router= express.Router()

router.use(authLimiter)

router.post("/register",createuser)
router.post("/login",loginuser)
router.post("/logout",logoutuser)

export default router