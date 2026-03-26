import mongoose from "mongoose";
import OrderItem from "../models/OrderItem";
import {
  OrderItem as MongooseOrderItem,
  OrderItemDto,
} from "../types/orderItems/orderItems";

export const createOrderItems = async (
  orderId: mongoose.Types.ObjectId,
  orderNumber: string,
  data: OrderItemDto[],
): Promise<MongooseOrderItem[]> => {
  // Create the order item payload
  const itemBatch = data.map((item) => {
    return {
      orderId: orderId,
      orderNumber: orderNumber,
      productId: item.product._id,
      price: item.product.price,
      quantity: item.quantity,
    };
  });
  // save to database
  return await OrderItem.insertMany(itemBatch);
};
