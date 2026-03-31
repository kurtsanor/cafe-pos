import { Response } from "express";
import { ApiResponse } from "../types/response/apiResponse";

export const success = <T>(
  res: Response,
  data?: T,
  message = "Success",
  statusCode = 200,
) => {
  const response: ApiResponse<T> = {
    status: "success",
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const created = <T>(
  res: Response,
  data?: T,
  message = "Created",
  statusCode = 201,
) => {
  const response: ApiResponse<T> = {
    status: "success",
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const deleted = <T>(
  res: Response,
  data?: T,
  message = "Deleted",
  statusCode = 204,
) => {
  const response: ApiResponse<T> = {
    status: "success",
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const badRequest = <T>(
  res: Response,
  data?: T,
  message = "Bad Request",
  statusCode = 400,
) => {
  const response: ApiResponse<T> = {
    status: "error",
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const forbidden = <T>(
  res: Response,
  data?: T,
  message = "Forbidden",
  statusCode = 403,
) => {
  const response: ApiResponse<T> = {
    status: "error",
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const unauthorized = <T>(
  res: Response,
  data?: T,
  message = "Unauthorized",
  statusCode = 401,
) => {
  const response: ApiResponse<T> = {
    status: "error",
    message,
    data,
  };
  return res.status(statusCode).json(response);
};
