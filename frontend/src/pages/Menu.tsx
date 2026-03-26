import {
  Button,
  Center,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import ProductCard from "../components/cards/ProductCard";
import classes from "../styles/Menu.module.css";
import {
  IconCheckFilled,
  IconCircleArrowRight,
  IconCircleX,
  IconShoppingCartOff,
} from "@tabler/icons-react";
import OrderItem from "../components/orders/OrderItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductsByPage } from "../api/product.api";
import type { Product } from "../types/product/product";
import type { ApiResponse } from "../types/response/apiResponse";
import { useState } from "react";
import type { CreateOrderDto, Order } from "../types/order/order";
import { createOrder } from "../api/order.api";
import { notifications } from "@mantine/notifications";
import type { OrderItem as OrderItemType } from "../types/orderItem/orderItem";
import type { PaginatedResponse } from "../types/pagination/pagination";

const Menu = () => {
  const [page, setPage] = useState(1);
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<ApiResponse<PaginatedResponse<Product[]>>, Error>({
    queryKey: ["products", page],
    queryFn: () => getProductsByPage(page),
  });

  const limit = 10;
  const total = products?.data?.count;
  const totalPages = Math.ceil((total || 0) / limit);

  const message = `Showing ${limit * (page - 1) + 1} - ${Math.min(total || 0, limit * page)} of ${total}`;

  const [cart, setCart] = useState<OrderItemType[]>([]);

  const queryClient = useQueryClient();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  // handles quantity increment via quantity component
  const handleIncrement = (productId: string) => {
    setCart((prev) =>
      prev.map((item) => {
        // find the target product and increment its quantity by one
        if (item.product._id === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      }),
    );
  };

  // handles quantity increment via quantity component
  const handleDecrement = (productId: string) => {
    setCart((prev) =>
      prev.map((item) => {
        // find the target product and increment its quantity by one
        if (item.product._id === productId) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      }),
    );
  };

  // handles removing of product from cart
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product._id !== productId));
  };

  // handles adding to cart
  const addToOrder = (product: Product) => {
    // check if product is already in cart to avoid duplicate
    const inCartAlready = cart.find((item) => item.product._id === product._id);
    if (inCartAlready) {
      return;
    }

    // if product is not in the cart, add it
    setCart((prev) => {
      const orderItem = {
        product,
        quantity: 1,
      };
      return [...prev, orderItem];
    });
  };

  const createMutation = useMutation<ApiResponse<Order>, Error, CreateOrderDto>(
    {
      mutationFn: createOrder,
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["orders"] });
        notifications.show({
          icon: <IconCheckFilled />,
          message: response.message,
        });
        setCart([]);
      },
    },
  );

  const handlePlaceOrder = () => {
    const payload: CreateOrderDto = {
      orderItems: cart,
    };
    createMutation.mutate(payload);
  };

  const productCards = products?.data?.data?.map((product) => (
    <ProductCard key={product._id} product={product} onClick={addToOrder} />
  ));

  const orderEntries = cart.map((order) => (
    <OrderItem
      key={order.product._id}
      order={order}
      handleIncrement={handleIncrement}
      handleDecrement={handleDecrement}
      removeFromCart={removeFromCart}
    />
  ));

  if (isLoading)
    return (
      <div className={classes.main}>
        <Center w={"100%"}>
          <Loader />
        </Center>
      </div>
    );

  if (isError) return <div>Error fetching products.</div>;

  return (
    <main className={classes.main}>
      <article className={classes.main__menu}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{productCards}</SimpleGrid>
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
      </article>

      {/* Order Entry Container */}
      <aside className={classes.main__order_entry}>
        {/* Order Entry Header */}
        <header className={classes.order_entry__header}>
          <h4>Order Entry</h4>
        </header>

        {/* Order Entry Body */}
        <main className={classes.order_entry__body}>
          {cart.length < 1 && (
            <Center flex={1}>
              <Stack align="center" gap={5}>
                <IconShoppingCartOff size={48} stroke={1.5} />
                <Text>No items in cart</Text>
                <span>Add products to get started</span>
              </Stack>
            </Center>
          )}
          {orderEntries}
        </main>

        {/* Order Entry Footer */}
        <footer className={classes.order_entry__footer}>
          <section className={classes.footer__total}>
            <h4>Total</h4>
            <h4>{`₱${totalPrice}`}</h4>
          </section>
          <section className={classes.footer__buttons}>
            <Button
              fullWidth
              className={classes.footer__buttons_clear}
              leftSection={<IconCircleX size={16} stroke={1.5} />}
              disabled={cart.length < 1 || createMutation.isPending}
              onClick={() => setCart([])}
            >
              Clear Order
            </Button>
            <Button
              fullWidth
              className={classes.footer__buttons_place}
              leftSection={<IconCircleArrowRight size={16} stroke={1.5} />}
              disabled={cart.length < 1}
              onClick={handlePlaceOrder}
              loading={createMutation.isPending}
            >
              Place Order
            </Button>
          </section>
        </footer>
      </aside>
    </main>
  );
};

export default Menu;
