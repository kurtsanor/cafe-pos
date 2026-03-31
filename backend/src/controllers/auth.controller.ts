import * as authService from "../services/auth.service";
import { Request, Response, NextFunction } from "express";
import { LoginRequest } from "../types/auth/auth";
import { RegisterRequest } from "../types/user/user";
import * as ResponseUtility from "../utils/response.util";
import * as JwtUtility from "../utils/jwt.util";
import User from "../models/User";
import { JwtClaims } from "../types/jwt/jwt";

export const register = async (
  req: Request<{}, {}, RegisterRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const registerRequest = req.body;

    await authService.register(registerRequest);

    ResponseUtility.created(res, null, "User has been registered.");
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request<{}, {}, LoginRequest>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const loginRequest = req.body;

    const { accessToken, refreshToken } = await authService.login(loginRequest);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge:
        Number(process.env.REFRESH_TOKEN_EXPIRY_DAYS) * 24 * 60 * 60 * 1000, // 7 days
    });

    ResponseUtility.success(res, { accessToken }, "Successfully logged in.");
  } catch (error: any) {
    error.status = 400;
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.refreshToken;
  if (!token) {
    return ResponseUtility.unauthorized(res, null, "No refresh token");
  }

  try {
    const decoded = JwtUtility.verifyRefreshToken(token) as JwtClaims;

    const user = await User.findById(decoded.userId);

    if (!user) {
      return ResponseUtility.badRequest(res, null, "User not found");
    }

    const parsedUserId = user._id.toString();

    const { accessToken } = JwtUtility.generateTokens(parsedUserId, user.role);

    ResponseUtility.success(res, { accessToken }, "New access token retrieved");
  } catch (error) {
    ResponseUtility.unauthorized(res, null, "Invalid refresh token");
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    ResponseUtility.success(res, null, "Logged out successfully");
  } catch (error) {
    next(error);
  }
};
