import { CreateCategoryDto } from "../types/category/category";
import * as ResponseUtility from "../utils/response.util";
import { Request, Response, NextFunction } from "express";
import * as categoryService from "../services/category.service";

export const createCategory = async (
  req: Request<{}, {}, CreateCategoryDto>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Retrieve the input from the request body
    const data = req.body;

    // create the category
    const category = await categoryService.createCategory(data);

    ResponseUtility.created(res, category, "Category created successfully.");
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const categories = await categoryService.getAllCategories();

    ResponseUtility.created(
      res,
      categories,
      "Categories retrieved succesfully.",
    );
  } catch (error) {
    next(error);
  }
};
