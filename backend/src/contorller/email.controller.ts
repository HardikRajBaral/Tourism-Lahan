import type {Request,Response} from "express";
import { transporter } from "../config/mailer";
import { logger } from "../lib/logger";
import type { Email } from "../Types/email";
import { emailTemplate } from "../lib/Emailtemplate";


export const sendEmail = async (req:Request,res:Response) => {
  try{
    await transporter.verify()
    logger.info({
      type: "email",
      message: "Server is ready to take our messages",
    })
    const {email, subject, messages,fullname}= req.body as Email

    const response = await transporter.sendMail({
        from:process.env.SMTP_USER,
        to:process.env.SMTP_USER,
        subject:`New Message: ${subject}`,
        html:emailTemplate(fullname, email, subject, messages),
    })
    logger.info({
      type: "email",
      message: "Email sent successfully",
      response,
    })
    res.status(200).json({
      message: "Email sent successfully",
    })
    
  }
  catch(err){
    logger.error({
      type: "email",
      message: "Verification failed",
      error: err,
    })
    res.status(500).json({
      message: "internal server error",
    })
  }
}

