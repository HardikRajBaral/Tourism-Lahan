import jwt from "jsonwebtoken";
import { logger } from "./logger";

type TokenPayload = {
    userId: string;
    email: string;
};

const requireSecret = (name: string): string => {
    const secret = process.env[name];
    if (!secret) {
        logger.error(`${name} is not configured`);
        throw new Error(`${name} is not configured`);
    }
    return secret;
};

export const AccessToken = (userId: string, email: string): string => {
    return jwt.sign({ userId, email } satisfies TokenPayload, requireSecret("JWT_SECRET"), {
        expiresIn: "15m",
    });
};

export const RefreshToken = (userId: string, email: string): string => {
    return jwt.sign({ userId, email } satisfies TokenPayload, requireSecret("REFRESH_TOKEN_SECRET"), {
        expiresIn: "30d",
    });
};

export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, requireSecret("REFRESH_TOKEN_SECRET")) as TokenPayload;
};