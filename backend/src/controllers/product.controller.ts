import * as productService from "../services/product.service";
import { CreateProductDto } from "../types/products/product";
import { Request, Response, NextFunction } from "express";
import * as ResponseUtility from "../utils/response.util";
import { MulterRequest } from "../types/request/multerRequest";
import { OrderItemDto } from "../types/orderItems/orderItems";

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

export const getProductsByPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // retrive page number from request query
  const page = req.query.page;
  let parsedPage;

  if (page) {
    parsedPage = Number(page);
  }

  if (!parsedPage || isNaN(parsedPage) || parsedPage < 1) {
    throw new Error(`Invalid page number: ${page}`);
  }

  try {
    const products = await productService.getProductsByPage(parsedPage);

    ResponseUtility.success(res, products, "Products retrieved");
  } catch (error) {
    next(error);
  }
};
