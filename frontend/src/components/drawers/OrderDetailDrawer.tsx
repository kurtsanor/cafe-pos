import {
  Button,
  Center,
  Divider,
  Group,
  Loader,
  SimpleGrid,
  Stack,
} from "@mantine/core";
import classes from "../../styles/OrderDetail.module.css";
import { IconPrinter } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getItemsByOrderId } from "../../api/order.api";
import type { Order } from "../../types/order/order";
import { toReadableDate } from "../../utils/dateFormatter";
import type { ApiResponse } from "../../types/response/apiResponse";
import type { MongooseOrderItem } from "../../types/orderItem/orderItem";
import Receipt from "../printables/Receipt";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

interface OrderDetailDrawerProps {
  order: Order;
}

const OrderDetailDrawer = ({ order }: OrderDetailDrawerProps) => {
  const {
    data: orderItems,
    isLoading,
    isError,
  } = useQuery<ApiResponse<MongooseOrderItem[]>, Error>({
    queryKey: ["order-items", order?._id],
    queryFn: () => getItemsByOrderId(order?._id),
    enabled: !!order?._id, // only fetch if theres an order
  });

  const receiptRef = useRef(null);

  const printableData = {
    order: order,
    orderItems: orderItems?.data!!,
  };

  const handlePrint = useReactToPrint({
    contentRef: receiptRef, // Point it to the Ref below
  });

  const itemList = orderItems?.data?.map((item) => (
    <Group justify="space-between" key={item._id} flex={1}>
      <span>
        <span className={classes.quantity}>{`${item.quantity} x`}</span>{" "}
        {item.productId?.name || "Deleted Product"}
      </span>
      <span>{`₱${(item.price * item.quantity).toFixed(2)}`}</span>
    </Group>
  ));

  if (isLoading)
    return (
      <Center w={"100%"} h={"100%"}>
        <Loader />
      </Center>
    );

  if (isError) return <div>Error fetching products.</div>;

  return (
    <>
      <div style={{ display: "none" }}>
        <div style={{ display: "block" }}>
          <Receipt ref={receiptRef} data={printableData} />
        </div>
      </div>
      <Stack>
        <h5>Summary</h5>
        <Divider />
        <SimpleGrid cols={2}>
          <span>Order ID</span>
          <span>{order?.orderId}</span>
          <span>Ordered At</span>
          <span>{toReadableDate(order?.createdAt)}</span>
        </SimpleGrid>
        <h5>Items</h5>
        <Divider />
        <Stack>{itemList}</Stack>
        <Divider />
        <Group mb="lg" justify="space-between">
          <h4>Total</h4>
          <h4>{`₱${order?.totalAmount.toFixed(2)}`}</h4>
        </Group>
      </Stack>
      <Group grow>
        <Button
          className={classes.button__print}
          leftSection={<IconPrinter size={16} />}
          onClick={handlePrint}
        >
          Print Invoice
        </Button>
      </Group>
    </>
  );
};

export default OrderDetailDrawer;
