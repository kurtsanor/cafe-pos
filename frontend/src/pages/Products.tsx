import {
  Button,
  Image,
  Pagination,
  Paper,
  ScrollArea,
  Table,
  TextInput,
} from "@mantine/core";
import classes from "../styles/Products.module.css";
import { IconFilter2, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const limit = 10;
const total = 145;
const totalPages = Math.ceil(total / limit);

const Products = () => {
  const [page, setPage] = useState(1);
  const message = `Showing ${limit * (page - 1) + 1} – ${Math.min(total, limit * page)} of ${total}`;

  const products = Array.from({ length: 5 }, (_, i) => (
    <Table.Tr key={i}>
      <Table.Td>
        <Image
          src="https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_2560%2Cc_limit/HLY-Veggie-Ramen-16x9.jpg"
          alt="product image"
          fit="cover"
          radius={"xs"}
          h={40}
          w={40}
        />
      </Table.Td>
      <Table.Td>Schezwan Egg Noodles</Table.Td>
      <Table.Td>Noodles</Table.Td>
      <Table.Td>$24.00</Table.Td>
    </Table.Tr>
  ));

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <h3>Products</h3>
        <section className={classes.header__buttons}>
          <Button variant="outline" leftSection={<IconFilter2 size={16} />}>
            Filter
          </Button>
          <Button leftSection={<IconPlus size={16} />}>New Product</Button>
        </section>
      </header>
      <TextInput
        mt={"md"}
        size="xs"
        leftSection={<IconSearch size={16} />}
        placeholder="Search Products...."
        variant="default"
      />
      <Paper shadow="xs" p="xs" mt={"md"}>
        <ScrollArea>
          <Table withRowBorders={false} striped>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Image</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Price</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{products}</Table.Tbody>
          </Table>
        </ScrollArea>
      </Paper>
      <footer className={classes.footer}>
        <span>{message}</span>
        <Pagination size={"sm"} total={10} withPages={false} ml="xs" />
      </footer>
    </main>
  );
};

export default Products;
