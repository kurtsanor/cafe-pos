import Order from "../models/Order";
import { CreateOrderDto, Order as MongooseOrder } from "../types/orders/order";
import * as orderItemService from "../services/orderItem.service";
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "../config/pagination";
import { PaginatedResponse } from "../types/pagination/pagination";

export const getOrdersByPage = async (
  page: number,
): Promise<PaginatedResponse<MongooseOrder[]>> => {
  const pageNumber = page ?? DEFAULT_PAGE_NUMBER;
  const skip = (pageNumber - 1) * DEFAULT_PAGE_SIZE;

  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(DEFAULT_PAGE_SIZE)
    .lean();

  const totalCount = await Order.countDocuments();

  const totalPages = Math.ceil(totalCount / DEFAULT_PAGE_SIZE);

  const paginatedResult: PaginatedResponse<MongooseOrder[]> = {
    page: pageNumber,
    count: totalCount,
    totalPages: totalPages,
    data: orders,
  };

  return paginatedResult;
};

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
