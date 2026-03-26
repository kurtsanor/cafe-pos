import * as ResponseUtility from "../utils/response.util";
import * as orderService from "../services/order.service";
import { Request, Response, NextFunction } from "express";
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

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const orders = await orderService.getAllOrders();

    ResponseUtility.success(res, orders, "Orders retrieved succesfully");
  } catch (error) {
    next(error);
  }
};
