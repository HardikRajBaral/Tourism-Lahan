import express from "express";
import { limiter } from "../../lib/limiter";
import { createPost, deletePost, listPost, singlePost, updatePost } from "../contorller/post.contoller";
import authenticate from "../middleware/authmiddleware";

const router= express.Router()

router.use(limiter)

router.get("/",listPost)
router.get("/:id",singlePost)
router.post("/",authenticate,createPost)
router.put("/:id",authenticate,updatePost)
router.delete("/:id",authenticate,deletePost)

export default router