import {
  CreateProductDto,
  Product as MongooseProduct,
} from "../types/products/product";
import Product from "../models/Product";

export const createProduct = async (
  data: CreateProductDto,
): Promise<MongooseProduct> => {
  return await Product.create(data);
};

export const getAllProducts = async (): Promise<MongooseProduct[]> => {
  return await Product.find().lean();
};
