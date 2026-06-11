import express from "express";
import { limiter } from "../lib/limiter";
import { createPost, deletePost, getAllPosts, listPost, singlePost, updatePost } from "../contorller/post.controller";
import authenticate from "../middleware/authmiddleware";
import { createPostSchema, updatePostSchema } from "../lib/validator";
import { validationMiddleware } from "../middleware/validationMiddleware";
import upload from "../middleware/multer";
import optionalAuth from "../middleware/OptionalAuth";

const router= express.Router()

router.use(limiter)

router.get("/",listPost)
router.get("/mine",authenticate,getAllPosts)
router.get("/:id",optionalAuth,singlePost)
router.post("/",authenticate,upload.single("image"),validationMiddleware(createPostSchema),createPost)
router.put("/:id",authenticate,upload.single("image"),validationMiddleware(updatePostSchema),updatePost)
router.delete("/:id",authenticate,deletePost)

export default router