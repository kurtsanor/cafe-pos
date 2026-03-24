import { Schema } from "mongoose";

const orderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: [true, "Order ID is required"],
    },
    // user friendly order # to be displayed
    orderNumber: {
      type: String,
      required: [true, "Order number is required"],
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
    },
  },
  {
    timestamps: true,
  },
);
