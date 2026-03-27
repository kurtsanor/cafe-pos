import { Document } from "mongoose";

interface BaseProduct {
  name: string;
  category: string;
  price: number;
}

export interface Product extends BaseProduct, Document {
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductDto extends BaseProduct {
  image?: Buffer;
}

export interface UpdateProductDto extends BaseProduct {
  _id: string;
  imageUrl?: string;
  imagePublicId?: string;
  image?: Buffer;
}
