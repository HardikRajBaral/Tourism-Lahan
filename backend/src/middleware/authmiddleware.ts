import type { NextFunction, Request, Response } from "express";
import { logger } from "../../lib/logger";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn({
        message: "Unauthorized access attempt",
        type: "auth",
        ip: req.ip,
      });
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      logger.error({
        message: "Token missing in authorization header",
        type: "auth",
        ip: req.ip,
      });
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!process.env.JWT_SECRET) {
      logger.error({
        message: "JWT secret not configured",
        type: "auth",
      });
      return res.status(500).json({ message: "Internal server error" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
      userId: string;
    };

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    logger.error({
      message: "Authentication error",
      error: err,
    });
    return res.status(401).json({ message: "Token expired or invalid" });
  }
};

export default authenticate;
