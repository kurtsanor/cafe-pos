import mongoose, { Schema } from "mongoose";
import { Order } from "../types/orders/order";

const orderSchema = new Schema<Order>(
  {
    orderId: {
      type: String,
      required: [true, "Order ID is required"],
      trim: true,
    },
    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },
    itemCount: {
      type: Number,
      required: [true, "Item count is required"],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
