import mongoose, { Schema } from "mongoose";
import { Product } from "../types/products/product";

const productSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    imageUrl: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Product", productSchema);
