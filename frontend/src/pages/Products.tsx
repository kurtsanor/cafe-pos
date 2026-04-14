import {
  ActionIcon,
  Button,
  Center,
  Image,
  Loader,
  Menu,
  Pagination,
  Paper,
  Table,
  TextInput,
} from "@mantine/core";
import classes from "../styles/Products.module.css";
import {
  IconCheckFilled,
  IconDotsVertical,
  IconEdit,
  IconFilter2,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { MODAL_KEYS } from "../constants/modals";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProductById, getProductsByPage } from "../api/product.api";
import type { ApiResponse } from "../types/response/apiResponse";
import type { Product } from "../types/product/product";
import type { PaginatedResponse } from "../types/pagination/pagination";
import { notifications } from "@mantine/notifications";
import { formatToTwoDecimals } from "../utils/currencyFormatter";

const Products = () => {
  // controlls pagination number
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ApiResponse<PaginatedResponse<Product[]>>, Error>({
    queryKey: ["products", page],
    queryFn: () => getProductsByPage(page, ""),
  });

  const queryClient = useQueryClient();

  // Handles opening of product form modal
  const openProductModal = () => {
    modals.openContextModal({
      title: "New Product",
      modal: MODAL_KEYS.ProductForm,
      innerProps: {},
      centered: true,
    });
  };

  const openEditModal = (product: Product) => {
    modals.openContextModal({
      title: "Edit Product",
      modal: MODAL_KEYS.ProductForm,
      innerProps: { product },
      centered: true,
    });
  };

  const deleteMutation = useMutation<ApiResponse<void>, Error, string>({
    mutationFn: deleteProductById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifications.show({
        color: "var(--pos-pop)",
        icon: <IconCheckFilled />,
        message: "Product has been deleted",
        withBorder: true,
        position: "bottom-left",
      });
    },
    onError: (error) => {
      notifications.show({
        message: error.message,
      });
    },
  });

  const deleteProduct = (id: string) => {
    deleteMutation.mutate(id);
  };

  const productRows = products?.data?.data.map((product) => (
    <Table.Tr key={product._id}>
      <Table.Td>
        <Image
          src={product.imageUrl}
          alt="product image"
          fit="cover"
          fallbackSrc="https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_2560%2Cc_limit/HLY-Veggie-Ramen-16x9.jpg"
          radius={"xs"}
          h={40}
          w={40}
        />
      </Table.Td>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{product.category}</Table.Td>
      <Table.Td>{`₱${formatToTwoDecimals(product.price)}`}</Table.Td>
      <Table.Td>
        <Menu>
          <Menu.Target>
            <ActionIcon
              variant="subtle"
              size={20}
              className={classes.row__action_icon}
            >
              <IconDotsVertical />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconEdit size={17} />}
              disabled={deleteMutation.isPending}
              onClick={() => openEditModal(product)}
            >
              <span>Edit</span>
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={<IconTrash size={17} />}
              onClick={() => deleteProduct(product._id)}
              disabled={deleteMutation.isPending}
            >
              <span>Delete</span>
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Table.Td>
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

  // transfer below because these are safe since data is guaranteed to exist
  const limit = 10;
  const total = products?.data?.count;
  const totalPages = Math.ceil((total || 0) / limit);

  const message = `Showing ${limit * (page - 1) + 1} - ${Math.min(total || 0, limit * page)} of ${total}`;

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <div className={classes.header_inner}>
          <h2 className={classes.header__title}>Product Catalog</h2>
          <p className={classes.header__description}>
            Manage your inventory and pricing in one place.
          </p>
        </div>
        <section className={classes.header__buttons}>
          <Button variant="outline" leftSection={<IconFilter2 size={16} />}>
            Filter
          </Button>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={openProductModal}
          >
            New Product
          </Button>
        </section>
      </header>
      <TextInput
        mt={"md"}
        size="xs"
        leftSection={<IconSearch size={16} />}
        placeholder="Search Products...."
        variant="default"
        mb={"md"}
      />
      <section className={classes.body__container}>
        <Paper shadow="xs" p="xs">
          <Table withRowBorders={false} striped={"even"}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Image</Table.Th>
                <Table.Th>Product Name</Table.Th>
                <Table.Th>Category</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{productRows}</Table.Tbody>
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

export default Products;
