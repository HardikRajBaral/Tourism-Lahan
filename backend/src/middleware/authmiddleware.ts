import type { NextFunction, Request, Response } from "express";
import { logger } from "../lib/logger";
import jwt from "jsonwebtoken";
import { AccessToken, verifyAccessToken, verifyRefreshToken } from "../lib/generateToken";
import { prisma } from "../config/prisma";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      logger.warn({
        message: "Unauthorized access attempt - no token in cookies",
        type: "auth",
        ip: req.ip,
      });
      return res.status(401).json({ message: "Unauthorized " });
    }
    if (!process.env.JWT_SECRET) {
      logger.error({
        message: "JWT secret not configured",
        type: "auth",
      });
      return res.status(500).json({ message: "Internal server error" });
    }
    try {
      const decoded = verifyAccessToken(token);
      req.userId = decoded.userId;
      return next();
    } catch (err) {
      logger.warn({
        message: "token verification failed",
        type: "auth",
        ip: req.ip,
      });
      if (!(err instanceof jwt.TokenExpiredError)) {
        res.status(401).json({ message: "Token expired or invalid" });
        return;
      }
    }
    const decoded = jwt.decode(token) as {
      userId: string;
      email: string;
    } | null;
    if (!decoded?.userId) {
      logger.warn({
        message: "token decode failed",
        type: "auth",
        ip: req.ip,
      });
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const storedRefreshToken = await prisma.token.findFirst({
      where: {
        userId: decoded.userId,
      },
    });
    if (!storedRefreshToken?.token) {
      logger.warn({
        type: "auth",
        message: "no refresh token found for userId: " + decoded.userId,
        ip: req.ip,
      });
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      verifyRefreshToken(storedRefreshToken.token);
    } catch (err) {
      logger.warn({
        type: "auth",
        message:
          "refresh token verification failed for userId: " + decoded.userId,
        ip: req.ip,
        error: err,
      });
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const newAccessToken = AccessToken(decoded.userId, decoded.email);
    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });
   return next();
  } catch (err) {
    logger.error({
      type: "auth",
      message: "Authentication error",
      error: err,
    });
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

export default authenticate;
