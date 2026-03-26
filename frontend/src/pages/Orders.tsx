import {
  Button,
  Center,
  Drawer,
  Loader,
  Pagination,
  Paper,
  Table,
  TextInput,
} from "@mantine/core";
import classes from "../styles/Orders.module.css";
import { IconFilter2, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import OrderDetailDrawer from "../components/drawers/OrderDetailDrawer";
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../api/order.api";
import type { ApiResponse } from "../types/response/apiResponse";
import type { Order } from "../types/order/order";
import { toReadableDate } from "../utils/dateFormatter";

const limit = 10;
const total = 145;
const totalPages = Math.ceil(total / limit);

const Orders = () => {
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<ApiResponse<Order[]>, Error>({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const message = `Showing ${limit * (page - 1) + 1} - ${Math.min(total, limit * page)} of ${total}`;

  const orderRows = orders?.data?.map((order) => (
    <Table.Tr key={order._id} onClick={() => setSelectedOrder(order._id)}>
      <Table.Td>{order.orderId}</Table.Td>
      <Table.Td>{toReadableDate(order.createdAt)}</Table.Td>
      <Table.Td>{order.itemCount}</Table.Td>
      <Table.Td>{`₱${order.totalAmount}`}</Table.Td>
    </Table.Tr>
  ));

  if (isLoading)
    return (
      <div className={classes.main}>
        <Center w={"100%"} h={"100%"}>
          <Loader />
        </Center>
      </div>
    );

  if (isError) return <div>Error fetching products.</div>;

  return (
    <main className={classes.main}>
      <Drawer
        title="Order Details"
        opened={!!selectedOrder}
        size={"xs"}
        offset={8}
        radius={"sm"}
        position="right"
        onClose={() => setSelectedOrder(null)}
      >
        <OrderDetailDrawer />
      </Drawer>
      <header className={classes.header}>
        <h3>Order History</h3>
        <section className={classes.header__buttons}>
          <Button variant="outline" leftSection={<IconFilter2 size={16} />}>
            Filter
          </Button>
        </section>
      </header>
      <TextInput
        mt={"md"}
        size="xs"
        leftSection={<IconSearch size={16} />}
        placeholder="Search Order #...."
        variant="default"
        mb={"md"}
      />
      <section className={classes.body__container}>
        <Paper shadow="xs" p="xs" flex={1}>
          <Table withRowBorders={false} striped={"even"} highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order ID</Table.Th>
                <Table.Th>Ordered At</Table.Th>
                <Table.Th>Total Items</Table.Th>
                <Table.Th>Order Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{orderRows}</Table.Tbody>
          </Table>
        </Paper>
      </section>
      <footer className={classes.footer}>
        <span>{message}</span>
        <Pagination size={"sm"} total={totalPages} withPages={false} ml="xs" />
      </footer>
    </main>
  );
};

export default Orders;
