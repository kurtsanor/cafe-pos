import {
  CreateProductDto,
  Product as MongooseProduct,
} from "../types/products/product";
import Product from "../models/Product";
import * as uploadService from "../services/upload.service";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../config/pagination";
import { PaginatedResponse } from "../types/pagination/pagination";

export const createProduct = async (
  data: CreateProductDto,
): Promise<MongooseProduct> => {
  // initialize image variables
  let imageUrl;
  let imagePublicId;

  // if request has an image, upload to cloudinary
  if (data.image) {
    const uploadResponse = await uploadService.uploadProductImage(data.image);
    imageUrl = uploadResponse.secure_url;
    imagePublicId = uploadResponse.public_id;
  }

  return await Product.create({
    name: data.name,
    category: data.category,
    price: data.price,
    imageUrl: imageUrl,
    imagePublicId: imagePublicId,
  });
};

export const getProductsByPage = async (
  page?: number,
): Promise<PaginatedResponse<MongooseProduct[]>> => {
  const pageNumber = page ?? DEFAULT_PAGE_NUMBER;
  const skip = (pageNumber - 1) * DEFAULT_PAGE_SIZE;

  const products = await Product.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(DEFAULT_PAGE_SIZE)
    .lean();

  const totalCount = await Product.countDocuments();

  const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE);

  const paginatedResult: PaginatedResponse<MongooseProduct[]> = {
    page: pageNumber,
    count: totalCount,
    totalPages: totalPages,
    data: products,
  };

  return paginatedResult;
};
