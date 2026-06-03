import "dotenv/config";
import express from "express";
import { logger } from "../lib/logger";
import postRouter from "./routes/post.routes";
import userRouter from "./routes/user.routes";
import { connectRedis } from "../lib/limiter";

const app =express()
const PORT = process.env.PORT || 3000;

app.use(express.json())

app.use('api/v1/posts',postRouter)
app.use('api/v1/users',userRouter)

const startServer= async()=>{
  connectRedis();
  app.listen(PORT,() => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

}
startServer()