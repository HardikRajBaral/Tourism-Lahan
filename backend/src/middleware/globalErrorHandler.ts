import type { NextFunction, Request, Response } from "express";
import { logger } from "../../lib/logger";

export const globalErrorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{
    logger.error(err.message,err)
    res.status(500).json({error:err.message})
}