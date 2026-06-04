import type { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { logger } from "../../lib/logger";
import bycript from "bcrypt";
import { AccessToken, RefreshToken } from "../../lib/generateToken";

export const createUser= async(req:Request,res:Response):Promise<void>=>{
    const {email,name,password}= req.body
    
    const existingUser= await prisma.user.findFirst({
        where:{
            email
        }
    })
    
    if (existingUser){
        logger.warn({
            type: "auth",
            message: "Attempt to register with existing email: " + email,
            ip: req.ip,
        })
        res.status(400).json({
            message:"user already exists"
        })
        return
    }
    try{
    const hassedPassword = await bycript.hash(password,13)
           
    const user = await prisma.user.create({
        data:{
            email,
            name,
            password:hassedPassword
        }
    })
    
    const refreshToken= RefreshToken(user.id,email)
    const accessToken= AccessToken(user.id,email)
    
    await prisma.token.create({
        data:{
            token:refreshToken,
            userId:user.id
        }
    })
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:15*60*1000
    })
    res.status(201).json({
        message:"user created successfully",
        accessToken,
    })
    }catch(err){
        logger.error({
            type: "auth",
            message: "Error during user registration",
            error: err,
        });
        res.status(500).json({
            message:"internal server error"
        })
    }
   
}

export const loginUser= async(req:Request,res:Response):Promise<void>=>{
    const {identifier,password}=req.body

   try{
     const user =await prisma.user.findFirst({
        where:{
            OR:[
                {email:identifier},
                {name:identifier}]
        }
    })
    if(!user){
        logger.warn({
            type: "auth",
            message: "Login attempt with non-existent identifier: " + identifier,
            ip: req.ip,
        });
        res.status(400).json({
            message:"invalid credentials"
        })
        return
    }

    const isPasswordValid = await bycript.compare(password,user.password)

    if(!isPasswordValid){
        logger.warn({
            type: "auth",
            message: "Invalid password attempt for identifier: " + identifier,
            ip: req.ip,
        }
    );
        res.status(400).json({
            message:"invalid credentials"
        })
        return
    }
    
   
    const accessToken = AccessToken(user.id,user.email)


    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:15*60*1000
    })

    const refreshToken = RefreshToken(user.id,user.email)
    await prisma.token.update({
        where:{
            userId:user.id
        },
        data:{
            token:refreshToken
        }
    })

    res.status(200).json({
        message:"Logged in successfully",
        accessToken
    })
     
   }catch(err){
    logger.error("Error during login: ", err);
    res.status(500).json({
        message:"internal server error"
    })
   }
}

export const logoutUser = async(req:Request,res:Response):Promise<void>=>{
   const userId = req.userId
   if(userId){
    await prisma.token.update({
        where:{
            userId
        },
        data:{
            token:""
        }
    })
   }
   res.clearCookie("accessToken",{
    httpOnly:true,
    secure:process.env.NODE_ENV === "production",
    sameSite:"strict",
   })
    res.status(200).json({
     message:"Logged out successfully"
    })
}