import {
  CreateProductDto,
  Product as MongooseProduct,
  UpdateProductDto,
} from "../types/products/product";
import Product from "../models/Product";
import * as uploadService from "../services/upload.service";
import { DEFAULT_PAGE_NUMBER, PRODUCTS_PAGE_SIZE } from "../config/pagination";
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
  category?: string,
): Promise<PaginatedResponse<MongooseProduct[]>> => {
  const pageNumber = page ?? DEFAULT_PAGE_NUMBER;
  const skip = (pageNumber - 1) * PRODUCTS_PAGE_SIZE;

  const filter: Record<string, any> = {};
  if (category) {
    filter.category = category;
  }

  const products = await Product.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(PRODUCTS_PAGE_SIZE)
    .lean();

  const totalCount = await Product.countDocuments(filter);

  const totalPages = Math.ceil(totalCount / PRODUCTS_PAGE_SIZE);

  const paginatedResult: PaginatedResponse<MongooseProduct[]> = {
    page: pageNumber,
    count: totalCount,
    totalPages: totalPages,
    data: products,
  };

  return paginatedResult;
};

export const updateProduct = async (data: UpdateProductDto) => {
  // if product image was changed, upload a new one
  if (data.image) {
    const uploadResult = await uploadService.uploadProductImage(
      data.image,
      data.imagePublicId,
    );
    data.imageUrl = uploadResult.secure_url;
    data.imagePublicId = uploadResult.public_id;
  }

  return await Product.findOneAndUpdate(
    {
      _id: data._id,
    },
    {
      name: data.name,
      category: data.category,
      price: data.price,
      imageUrl: data.imageUrl,
      imagePublicId: data.imagePublicId,
    },
    { returnDocument: "after", runValidators: true },
  );
};

export const deleteProductById = async (productId: string) => {
  await Product.deleteOne({ _id: productId });
};
