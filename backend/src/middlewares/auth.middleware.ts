import { Request, Response, NextFunction } from "express";
import * as ResponseUtility from "../utils/response.util";
import { verifyToken } from "../utils/jwt.util";
import { JwtClaims } from "../types/jwt/jwt";

declare global {
  namespace Express {
    interface Request {
      user?: JwtClaims | string;
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return ResponseUtility.unauthorized(
        res,
        null,
        "Unauthorized: No authentication token.",
      );
    }

    const token = header.split(" ")[1];

    const decoded = verifyToken(token) as JwtClaims;
    req.user = decoded;
    next();
  } catch (error) {
    ResponseUtility.unauthorized(res, null, "Token has expired or is invalid.");
  }
};
