import { Request, Response, NextFunction } from "express";
import * as analyticsService from "../services/analytics.service";
import * as ResponseUtility from "../utils/response.util";

export const getTotalSalesToday = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const totalSales = await analyticsService.getTotalSalesToday();

    ResponseUtility.success(
      res,
      totalSales,
      "Total sales today retrieved successfully",
    );
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const analytics = await analyticsService.getDashboardStats();

    ResponseUtility.success(res, analytics, "Analytics retrieved successfully");
  } catch (error) {
    next(error);
  }
};

export const getSalesByDate = async (
  req: Request<{}, {}, {}, { date: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { date } = req.query;

    if (!date) {
      ResponseUtility.badRequest(res, null, "Date parameter is required");
    }

    const salesData = await analyticsService.getSalesByDate(date);

    ResponseUtility.success(res, salesData, "Sales retrieved successfully");
  } catch (error) {
    next(error);
  }
};
