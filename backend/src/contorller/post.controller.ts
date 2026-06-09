import type { Request, Response } from "express";
import { type PostType } from "../../lib/validator";
import { logger } from "../../lib/logger";
import { prisma } from "../../lib/prisma";
import type { Post, PostDetail, PostListItem } from "../../Types/PostTypes";
import type { SortField, SortOrder } from "../../Types/FilterTypes";
import cloudinary from "../config/cloudinary";
import path from "path";


export const createPost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if(!req.file){
       res.status(400).json({
        message: "image is required",
      });
      return
    }
    const image = req.file.buffer ;
    const {name}= path.parse(req.file.originalname)
    const fileBufferBase64 =`data:${req.file.mimetype};base64,${image.toString('base64')}`;
    const result = await cloudinary.uploader.upload(fileBufferBase64, {
      resource_type: "image",
      folder: "tourism",
      public_id:`post-${name}-${Date.now()}`,
      transformation: {
        quality: "auto",
        fetch_format: "auto",
      },
    });
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
    logger.info({
      type: "post",
      message: "Post created",
      postId: newPost.id,
      authorId,
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
  try {
    const userId = req.userId as string;
    const postId = req.params.id as string;
    const { title, excerpt, content, published } =
      req.body as Partial<PostType>;

    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      logger.warn({
        type: "post",
        message: "Post not found",
        postId,
      });
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (post?.authorId !== userId) {
      logger.warn({
        type: "auth",
        message: "Unauthorized update attempt",
        postId,
        userId,
      });
      return res.status(403).json({
        message: "Forbidden: You are not the author of this post",
      });
    }

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title: title ?? post.title,
        excerpt: excerpt ?? post.excerpt,
        content: content ?? post.content,
        published: published ?? post.published,
        updatedAt: new Date(),
      },
    });
    logger.info({
      type: "post",
      message: "Post updated",
      postId,
      userId,
    });
    return res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (err) {
    logger.error({
      type: "post",
      message: "Error updating post",
      error: err,
    });
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const listPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = req.query.search as string | undefined;
    const sort = req.query.sort as SortField | "updatedAt";
    const order = req.query.order as SortOrder | "desc";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;

    const where: any = {
      published: true,
    };
    if (search) {
      where.title = {
        contains: search,
        mode: "insensitive",
      };
    }

    const post: PostListItem[] = await prisma.post.findMany({
      where,
      orderBy: {
        [sort]: order,
      },
      skip: page > 1 ? (page - 1) * limit : 0,
      take: limit,
    });
    logger.info({
      type: "post",
      message: "Posts fetched",
      count: post.length,
    });
    res.status(200).json(post);
    return;
  } catch (error) {
    logger.error({
      type: "post",
      message: "Error fetching posts",
      error,
    });
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const singlePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const post: PostDetail | null = await prisma.post.findFirst({
      where: {
        id: req.params.id as string,
        published: true,
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        published: true,
        authorId: true,
        updatedAt: true,
      },
    });

    if (!post) {
      logger.warn({
        type: "post",
        message: "Post not found",
        postId: req.params.id,
      });
      res.status(404).json({
        message: "Post not found",
      });
      return;
    }
    logger.info({
      type: "post",
      message: "Post fetched",
      postId: req.params.id,
    });
    res.status(200).json(post);
    return;
  } catch (error) {
    logger.error({
      type: "post",
      message: "Error fetching post",
      error,
    });
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const useId = req.userId as string;
    const postId = req.params.id as string;
    const canDelete = await prisma.post.findFirst({
      where: {
        id: postId,
        authorId: useId,
      },
    });
    if (!canDelete) {
      logger.warn({
        type: "auth",
        message: "Unauthorized delete attempt",
        postId,
        userId: useId,
      });
      return res.status(403).json({
        message: "Forbidden: You are not the author of this post",
      });
    }
    const post = await prisma.post.delete({
      where: {
        id: req.params.id as string,
      },
    });
    logger.info({
      type: "post",
      message: "Post deleted",
      postId: req.params.id,
    });
    res.status(200).json({
      message: "Post deleted successfully",
      post,
    });
  } catch (error) {
    logger.error({
      type: "post",
      message: "Error deleting post",
      error,
    });
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const sort = req.query.sort as string | "updatedAt";
    const order = req.query.order as string | "desc";
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;

    const userId = req.userId as string;

    const posts: Post[] = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        [sort]: order,
      },
      skip: page > 1 ? (page - 1) * limit : 0,
      take: limit,
    });

    logger.info({
      type: "post",
      message: "User's posts fetched",
      userId,
      count: posts.length,
    });

    res.status(200).json(posts);
  } catch (err) {
    logger.error({
      type: "post",
      message: "Error fetching user's posts",
      error: err,
    });

    res.status(500).json({
      message: "internal server error",
    });
  }
};
