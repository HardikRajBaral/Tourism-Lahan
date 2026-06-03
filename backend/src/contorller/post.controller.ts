import type { Request, Response } from "express";
import { createPostSchema, type PostType } from "../../lib/validator";
import { logger } from "../../lib/logger";
import { prisma } from "../../lib/prisma";



export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, excerpt, content, published } = req.body as PostType;
    const authorId = req.userId as string;
    const newPost = await prisma.post.create({
      data: {
        title,
        excerpt,
        content,
        published,
        authorId,
      },
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });


  } catch (error) {
    logger.error("Error creating post: ", error);
    res.status(500).json({
      message: "internal server error",
    });
  }
};





export const updatePost = async (req: Request, res: Response) => {
  try{
    const userId= req.userId as string;
    const postId= req.params.id as string
    const { title, excerpt, content, published } = req.body as Partial<PostType>;

    const post =await  prisma.post.findUnique({
      where:{
        id: postId
      }
    })
  
    if(!post){
      logger.warn({
        type:"post",
        message:"Post not found",
        postId
      })
      return res.status(404).json({
        message: "Post not found"
      })
    }

    if (post?.authorId !== userId){
      logger.warn({
        type:"auth",
        message:"Unauthorized update attempt",
        postId,
        userId
      })
      return res.status(403).json({
        message: "Forbidden: You are not the author of this post",
      })
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
       title: title?? post.title,
       excerpt: excerpt ?? post.excerpt,
       content: content ?? post.content,
       published: published ?? post.published,
       updatedAt: new Date(),
      },
    });

    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });

    

  }catch (err){
    logger.error({
      type: "post",
      message: "Error updating post",
      error: err,
    });
    res.status(500).json({
      message: "internal server error",
    })
  }
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
