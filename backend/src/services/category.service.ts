import Category from "../models/Category";
import {
  Category as MongooseCategory,
  CreateCategoryDto,
} from "../types/category/category";

export const createCategory = async (
  category: CreateCategoryDto,
): Promise<MongooseCategory> => {
  return await Category.create({
    name: category.name,
    description: category.description,
  });
};

export const getAllCategories = async (): Promise<MongooseCategory[]> => {
  return await Category.find();
};
