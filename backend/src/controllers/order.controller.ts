import * as ResponseUtility from "../utils/response.util";
import * as orderService from "../services/order.service";
import * as orderItemService from "../services/orderItem.service";
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

export const getOrdersByPage = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // retrive page number from request query
  const page = req.query.page || 1;
  let parsedPage;

  if (page) {
    parsedPage = Number(page);
  }

  if (!parsedPage || isNaN(parsedPage) || parsedPage < 1) {
    throw new Error(`Invalid page number: ${page}`);
  }

  try {
    const orders = await orderService.getOrdersByPage(parsedPage);

    ResponseUtility.success(res, orders, "Orders retrieved succesfully");
  } catch (error) {
    next(error);
  }
};

export const getOrderItemsByOrderId = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const orderId = req.params.id;

    const orderItems = await orderItemService.getItemsByOrderId(orderId);

    ResponseUtility.success(
      res,
      orderItems,
      "Order items retrieved successfully",
    );
  } catch (error) {
    next(error);
  }
};
