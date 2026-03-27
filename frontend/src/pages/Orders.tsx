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
import { getOrdersByPage } from "../api/order.api";
import type { ApiResponse } from "../types/response/apiResponse";
import type { Order } from "../types/order/order";
import { toReadableDate } from "../utils/dateFormatter";
import type { PaginatedResponse } from "../types/pagination/pagination";

const Orders = () => {
  const [page, setPage] = useState(1);
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<ApiResponse<PaginatedResponse<Order[]>>, Error>({
    queryKey: ["orders", page],
    queryFn: () => getOrdersByPage(page),
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orderRows = orders?.data?.data?.map((order) => (
    <Table.Tr key={order._id} onClick={() => setSelectedOrder(order)}>
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

  const limit = 10;
  const total = orders?.data?.count;
  const totalPages = Math.ceil((total || 0) / limit);

  const message = `Showing ${limit * (page - 1) + 1} - ${Math.min(total || 0, limit * page)} of ${total}`;

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
        <OrderDetailDrawer order={selectedOrder!} />
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
        <Pagination
          size={"sm"}
          total={totalPages}
          withPages={false}
          value={page}
          ml="xs"
          onPreviousPage={() => setPage((prev) => prev - 1)}
          onNextPage={() => setPage((prev) => prev + 1)}
        />
      </footer>
    </main>
  );
};

export default Orders;
