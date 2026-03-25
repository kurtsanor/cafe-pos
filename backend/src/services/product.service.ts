import {
  CreateProductDto,
  Product as MongooseProduct,
} from "../types/products/product";
import Product from "../models/Product";
import * as uploadService from "../services/upload.service";

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

export const getAllProducts = async (): Promise<MongooseProduct[]> => {
  return await Product.find().lean();
};
