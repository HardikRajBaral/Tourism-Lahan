import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../lib/generateToken";
import { error } from "node:console";

const optionalAuth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
    if(!token){
        return next()
    }
    try{
        const decoded = verifyAccessToken(token)
         req.userId= decoded.userId
    }catch (error){
        next(error)
    }
    next() 
}
export default optionalAuth