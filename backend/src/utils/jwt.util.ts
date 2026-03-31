import jwt from "jsonwebtoken";
import { JwtTokens } from "../types/jwt/jwt";
import { StringValue } from "ms";

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
};

export const generateTokens = (userId: string, role: string): JwtTokens => {
  const accessToken = jwt.sign(
    { userId, role },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: process.env.JWT_ACCESS_EXPIRATION as StringValue },
  );

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION as StringValue,
  });

  return { accessToken, refreshToken };
};
