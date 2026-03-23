import {
  Button,
  Drawer,
  Pagination,
  Paper,
  ScrollArea,
  Table,
  TextInput,
} from "@mantine/core";
import classes from "../styles/Products.module.css";
import { IconFilter2, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import OrderDetailDrawer from "../components/drawers/OrderDetailDrawer";

const limit = 10;
const total = 145;
const totalPages = Math.ceil(total / limit);

const Orders = () => {
  const [page, setPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const message = `Showing ${limit * (page - 1) + 1} - ${Math.min(total, limit * page)} of ${total}`;

  const products = Array.from({ length: 8 }, (_, i) => (
    <Table.Tr key={i} onClick={() => setSelectedOrder(i + 1)}>
      <Table.Td>#09093</Table.Td>
      <Table.Td>09:56:00 AM</Table.Td>
      <Table.Td>$124.00</Table.Td>
    </Table.Tr>
  ));

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
      />
      <Paper shadow="xs" p="xs" mt={"md"}>
        <ScrollArea>
          <Table withRowBorders={false} striped={"even"} highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Order #</Table.Th>
                <Table.Th>Time</Table.Th>
                <Table.Th>Order Total</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{products}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
      <footer className={classes.footer}>
        <span>{message}</span>
        <Pagination size={"sm"} total={totalPages} withPages={false} ml="xs" />
      </footer>
    </main>
  );
};

export default Orders;
