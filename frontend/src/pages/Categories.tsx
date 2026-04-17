import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Loader,
  Menu,
  Paper,
  Table,
  TextInput,
  Text,
} from "@mantine/core";
import classes from "../styles/Categories.module.css";
import {
  IconCheckFilled,
  IconDotsVertical,
  IconPlus,
  IconSearch,
  IconTrash,
} from "@tabler/icons-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "../types/response/apiResponse";
import { deleteCategoryById, getAllCategories } from "../api/categories.api";
import type { Category } from "../types/categories/category";
import { modals } from "@mantine/modals";
import { MODAL_KEYS } from "../constants/modals";
import { notifications } from "@mantine/notifications";

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery<ApiResponse<Category[]>, Error>({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation<
    ApiResponse<void>, // return type
    Error, // type of error
    string // input type
  >({
    mutationFn: deleteCategoryById,
    onSuccess: () => {
      // invalidate the cache
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // show notification
      notifications.show({
        color: "var(--pos-pop)",
        icon: <IconCheckFilled />,
        message: "Category deleted successfully.",
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

  const openCategoryModal = () => {
    modals.openContextModal({
      title: (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Text fw={700}>Add New Category</Text>
          <Text size="xs" c="dimmed" fw={400}>
            Enter the category details below.
          </Text>
        </div>
      ),
      modal: MODAL_KEYS.CategoryForm,
      innerProps: {},
      centered: true,
    });
  };

  const categoryRows = categories?.data?.map((category) => (
    <Table.Tr key={category._id}>
      <Table.Td>{category.name}</Table.Td>
      <Table.Td>{category.description}</Table.Td>
      <Table.Td>
        <Badge size="xs" variant="filled" className={classes.badge}>
          Active
        </Badge>
      </Table.Td>
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
              fz={"xs"}
              color="red"
              leftSection={<IconTrash size={17} />}
              onClick={() => deleteMutation.mutate(category._id)}
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

  return (
    <main className={classes.main}>
      <header className={classes.header}>
        <div className={classes.header_inner}>
          <h2 className={classes.header__title}>Categories</h2>
          <p className={classes.header__description}>
            Track and manage your product categories.
          </p>
        </div>
        <section className={classes.header__buttons}>
          <Button
            leftSection={<IconPlus size={16} />}
            onClick={openCategoryModal}
          >
            New Category
          </Button>
        </section>
      </header>
      <TextInput
        mt={"md"}
        size="xs"
        leftSection={<IconSearch size={16} />}
        placeholder="Search category...."
        variant="default"
        mb={"md"}
      />
      <section className={classes.body__container}>
        <Paper withBorder p="xs" flex={1}>
          <Table withRowBorders={false} striped={"even"}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Category</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Action</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{categoryRows}</Table.Tbody>
          </Table>
        </Paper>
      </section>
    </main>
  );
};

export default Categories;
