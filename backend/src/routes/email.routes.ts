import express from "express";
import { sendEmail } from "../contorller/email.controller";
import { emailLimiter } from "../lib/limiter";
const router = express.Router()

router.post('/sendEmail',emailLimiter,sendEmail)

export default router