import {
  Button,
  Center,
  Drawer,
  Loader,
  Pagination,
  Paper,
  Popover,
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
import { formatToTwoDecimals } from "../utils/currencyFormatter";
import OrderFilterPopover from "../components/popovers/OrderFilterPopover";
import type { DateRange } from "../types/dates/dateRange";

const Orders = () => {
  const [page, setPage] = useState(1);
  const [filterOpened, setFilterOpened] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<DateRange>();
  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery<ApiResponse<PaginatedResponse<Order[]>>, Error>({
    queryKey: ["orders", page, dateRange],
    queryFn: () => getOrdersByPage(page, dateRange?.from, dateRange?.to),
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const orderRows = orders?.data?.data?.map((order) => (
    <Table.Tr key={order._id} onClick={() => setSelectedOrder(order)}>
      <Table.Td>{order.orderId}</Table.Td>
      <Table.Td>{toReadableDate(order.createdAt)}</Table.Td>
      <Table.Td>{order.itemCount}</Table.Td>
      <Table.Td>{`₱${formatToTwoDecimals(order.totalAmount)}`}</Table.Td>
    </Table.Tr>
  ));

  const handleFilterChange = (from: string, to: string) => {
    setDateRange({
      from,
      to,
    });
    setFilterOpened(false);
  };

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
        <div className={classes.header_inner}>
          <h2 className={classes.header__title}>Order Management</h2>
          <p className={classes.header__description}>
            Track and manage all incoming customer transactions.
          </p>
        </div>
        <section className={classes.header__buttons}>
          <Popover
            keepMounted
            opened={filterOpened}
            onChange={setFilterOpened}
            closeOnClickOutside={false}
            width={300}
          >
            <Popover.Target>
              <Button
                variant="outline"
                leftSection={<IconFilter2 size={16} />}
                onClick={() => setFilterOpened((prev) => !prev)}
              >
                Filters
              </Button>
            </Popover.Target>
            <Popover.Dropdown>
              <OrderFilterPopover onApply={handleFilterChange} />
            </Popover.Dropdown>
          </Popover>
        </section>
      </header>
      <TextInput
        mt={"md"}
        size="xs"
        leftSection={<IconSearch size={16} />}
        placeholder="Search Order ID...."
        variant="default"
        mb={"md"}
      />
      <section className={classes.body__container}>
        <Paper withBorder p="xs" flex={1}>
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
