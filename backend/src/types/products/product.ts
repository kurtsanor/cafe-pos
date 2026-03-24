import { Document } from "mongoose";

export interface Product extends Document {
  name: string;
  category: string;
  price: number;
  imageUrl?: string;
  imagePublicId?: string;
  createdAt: Date;
  updatedAt: Date;
}
