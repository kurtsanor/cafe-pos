import { NextFunction, Request, Response } from "express";

export interface ErrorMiddlewareParams {
  err: CustomError;
  req: Request;
  res: Response;
  next: NextFunction;
}

export interface CustomError extends Error {
  status?: number;
}
