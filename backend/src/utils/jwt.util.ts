import jwt from "jsonwebtoken";
import { JwtTokens } from "../types/jwt/jwt";

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
    { expiresIn: "1h" },
  );

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};
