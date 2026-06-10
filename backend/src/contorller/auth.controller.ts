import type { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { logger } from "../lib/logger";
import bycript from "bcrypt";
import {
  AccessToken,
  RefreshToken,
  verifyRefreshToken,
} from "../lib/generateToken";

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email, username, password } = req.body;

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (existingUser) {
    logger.warn({
      type: "auth",
      message: "Attempt to register with existing email: " + email,
      ip: req.ip,
    });
    res.status(400).json({
      message: "user already exists",
    });
    return;
  }
  try {
    const hassedPassword = await bycript.hash(password, 13);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hassedPassword,
      },
    });

    const refreshToken = RefreshToken(user.id, email);
    const accessToken = AccessToken(user.id, email);

    await prisma.token.create({
      data: {
        token: refreshToken,
        userId: user.id,
      },
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });
    res.status(201).json({
      message: "user created successfully",
      accessToken,
    });
  } catch (err) {
    logger.error({
      type: "auth",
      message: "Error during user registration",
      error: err,
    });
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { identifier, password } = req.body;

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });
    if (!user) {
      logger.warn({
        type: "auth",
        message: "Login attempt with non-existent identifier: " + identifier,
        ip: req.ip,
      });
      res.status(401).json({
        message: "invalid credentials",
      });
      return;
    }

    const isPasswordValid = await bycript.compare(password, user.password);

    if (!isPasswordValid) {
      logger.warn({
        type: "auth",
        message: "Invalid password attempt for identifier: " + identifier,
        ip: req.ip,
      });
      res.status(401).json({
        message: "invalid credentials",
      });
      return;
    }

    const accessToken = AccessToken(user.id, user.email);

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    const refreshToken = RefreshToken(user.id, user.email);
    await prisma.token.update({
      where: {
        userId: user.id,
      },
      data: {
        token: refreshToken,
      },
    });

    res.status(200).json({
      message: "Logged in successfully",
      accessToken,
    });
  } catch (err) {
    logger.error("Error during login: ", err);
    res.status(500).json({
      message: "internal server error",
    });
  }
};

export const logoutUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const userId = req.userId;
  if (userId) {
    await prisma.token.update({
      where: {
        userId,
      },
      data: {
        token: "",
      },
    });
  }
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({
    message: "Logged out successfully",
  });
};

// auth.controller.ts
export const refreshAccessToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = req.cookies?.refreshToken as string | undefined;

  if (!token) {
    res.status(401).json({ message: "No refresh token" });
    return;
  }

  try {
    const payload = verifyRefreshToken(token);

    // Check it matches what's stored in DB
    const stored = await prisma.token.findFirst({
      where: { userId: payload.userId, token },
    });

    if (!stored) {
      res.status(401).json({ message: "Invalid refresh token" });
      return;
    }

    const newAccessToken = AccessToken(payload.userId, payload.email);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({ accessToken: newAccessToken });
  } catch (err) {
    // Refresh token expired or tampered
    res
      .status(401)
      .json({ message: "Refresh token expired, please login again" });
  }
};

export const getMe = async (req: Request, res: Response): Promise<void> => {
  const userId = req.userId as string;
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true
    },
  })
  if(!user){
    logger.error({
      type:"auth",
      message:"User not found",
      userId
    })
    res.status(401).json({
      message:"User not found"
    })
    return
  }
  res.status(200).json(user)
}