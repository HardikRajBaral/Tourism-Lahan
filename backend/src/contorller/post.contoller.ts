import type { Request, Response } from "express";
import { createPostSchema, type PostType } from "../../lib/validator";
import { logger } from "../../lib/logger";

export const createPost =async (req: Request, res: Response): Promise<void> => {
    // try{
    //     const { title, excerpt, content, published, authorId } = req.body as PostType;
    //     const userId= req.userId
    //     if(!userId){
    //         logger.warn("User Id is missing in the request");
    //         res.status(400).json({error:"userId is required"})
    //         return 
    //     }


    // }
}
export const updatePost = (req: Request, res: Response) => {
  return true;
};
export const listPost = (req: Request, res: Response) => {
  return true;
};
export const singlePost = (req: Request, res: Response) => {
  return true;
};
export const deletePost = (req: Request, res: Response) => {
  return true;
};
