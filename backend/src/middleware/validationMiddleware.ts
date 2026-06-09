import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export const validationMiddleware = (schema: ZodType) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const err = result.error.issues
        .map((issue) => `${issue.message} at ${issue.path.join('.')}`)
        .join(', ');
      logger.error('Validation error:', err);
      res.status(400).json({ message:"validation error",error: err });
      return;
    }
    
    req.body = result.data;
    next();
  };
};

export default validationMiddleware;
