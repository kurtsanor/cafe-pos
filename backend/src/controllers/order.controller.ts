import * as ResponseUtility from "../utils/response.util";
import * as orderService from "../services/order.service";
import { Request, Response, NextFunction } from "express";
import { OrderItemDto } from "../types/orderItems/orderItems";
import { CreateOrderDto } from "../types/orders/order";

export const createOrder = async (
  req: Request<{}, {}, CreateOrderDto>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Retrieve the orderlist from the request body
    const data = req.body;

    // create the order
    const order = await orderService.createOrder(data);

    ResponseUtility.created(res, order, "Order has been saved");
  } catch (error) {
    next(error);
  }
};
