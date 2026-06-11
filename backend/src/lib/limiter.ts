import redis from "redis";
import { logger } from "./logger";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";


const client =  redis.createClient()

client.on("error", (err) => {
    logger.error("Redis client error:", err);
})

client.on("ready", () => {
    logger.info("Redis client ready");
})

client.on("reconnecting", () => {
    logger.info("Redis client reconnecting....");
})

export async function connectRedis(){
    try{
        if(!client.isOpen){
            logger.info("Connecting to Redis....");
            await client.connect()
        }
    }
    catch(err){
        logger.error({
            message:"Failed to connect to Redis",
            error:err
        })
    }
}

await connectRedis();

export const limiter = rateLimit({
    windowMs:15 * 60 *1000, //15 min
    max:200,
    message:"Too many requests, please try again after 15 minutes",
        store: new RedisStore({
            sendCommand:(...args:string[])=>client.sendCommand(args)
        }),
    legacyHeaders:false,
    standardHeaders:true,
})

export const authLimiter = rateLimit({
    windowMs:15 * 60 *1000, //15 min
    max:100,
    message:"Too many requests, please try again after 15 minutes",
        store: new RedisStore({
            sendCommand:(...args:string[])=>client.sendCommand(args)
        }),
    legacyHeaders:false,
    standardHeaders:true,
})


export const emailLimiter = rateLimit({
    windowMs:15 * 60 *1000, //15 min
    max:20,
    message:"Too many requests, please try again after 15 minutes",
        store: new RedisStore({
            sendCommand:(...args:string[])=>client.sendCommand(args)
        }),
    legacyHeaders:false,
    standardHeaders:true,
})