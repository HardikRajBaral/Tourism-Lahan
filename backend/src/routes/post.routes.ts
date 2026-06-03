import express from "express";
import { limiter } from "../../lib/limiter";
import { createPost, deletePost, listPost, singlePost, updatePost } from "../contorller/post.controller";
import authenticate from "../middleware/authmiddleware";
import { createPostSchema, updatePostSchema } from "../../lib/validator";
import { validationMiddleware } from "../middleware/validationMiddleware";

const router= express.Router()

router.use(limiter)

router.get("/",listPost)
router.get("/:id",singlePost)
router.post("/",authenticate,validationMiddleware(createPostSchema),createPost)
router.put("/:id",authenticate,validationMiddleware(updatePostSchema),updatePost)
router.delete("/:id",authenticate,deletePost)

export default router