import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { logger } from "../../lib/logger";
import bycript from "bcrypt";
import { RefreshToken } from "../../lib/generateToken";

const createUser= async(req:Request,res:Response):Promise<void>=>{
    const {email,name,password}= req.body
    
    const existingUser= await prisma.user.findFirst({
        where:{
            email
        }
    })
    const hassedPassword =await bycript.hash(password,13)
    if (existingUser){
        logger.info("Attempt to register with existing email: " + email);
        res.status(400).json({
            message:"user already exists"
        })
    }
    const user = await prisma.user.create({
        data:{
            email,
            name,
            password:hassedPassword
        }
    })
    
    const refreshToken= RefreshToken(user.id,email)
    await prisma.token.create({
        data:{
            token:refreshToken,
            userId:user.id
        }
    })
   
}

