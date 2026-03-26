import Order from "../models/Order";
import { CreateOrderDto } from "../types/orders/order";
import * as orderItemService from "../services/orderItem.service";

export const createOrder = async (data: CreateOrderDto) => {
  // create a custom order ID
  const orderNumber = await generateOrderNumber();

  //count the number of items
  const itemCount = data.orderItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  // sum the total amount
  const totalAmount = data.orderItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const order = await Order.create({
    orderId: orderNumber,
    itemCount: itemCount,
    totalAmount: totalAmount,
  });

  await orderItemService.createOrderItems(
    order._id,
    orderNumber,
    data.orderItems,
  );
};

// helper method to generate an Order #
const generateOrderNumber = async () => {
  const lastOrder = await Order.findOne().sort({ createdAt: -1 }).exec();
  let nextNumber = 1;

  if (lastOrder && lastOrder.orderId) {
    const lastNumber = parseInt(lastOrder.orderId.split("-")[1]);
    nextNumber = lastNumber + 1;
  }

  const newOrderId = `ORD-${nextNumber.toString().padStart(4, "0")}`;
  return newOrderId;
};
