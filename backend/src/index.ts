import "dotenv/config";
import express from "express";
import { logger } from "../lib/logger";
import postRouter from "./routes/post.routes";
import userRouter from "./routes/user.routes";
import { connectRedis } from "../lib/limiter";
import cookieParser from "cookie-parser";
import cors from "cors";



const app =express()
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}))

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/posts',postRouter)
app.use('/api/v1/users',userRouter)

const startServer= async()=>{
  connectRedis();
  app.listen(PORT,() => {
  logger.info(`Server running on [  http://localhost:${PORT}  ]`);
});

}
startServer()