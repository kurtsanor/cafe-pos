import * as productService from "../services/product.service";
import { CreateProductDto } from "../types/products/product";
import { Request, Response, NextFunction } from "express";
import * as ResponseUtility from "../utils/response.util";
import { MulterRequest } from "../types/request/multerRequest";

// Create a mongoose product
export const createProduct = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Retreive the product info from the request body
    // const reqBody: CreateProductDto = req.body;
    const productData: CreateProductDto = {
      ...req.body,
      image: req.file?.buffer,
    };

    // Create the product via product service
    const product = await productService.createProduct(productData);

    // Return response 201 Created
    ResponseUtility.created(res, product, "Product has been created");
  } catch (error) {
    next(error);
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const products = await productService.getAllProducts();

  ResponseUtility.success(res, products, "Products retrieved");
};
