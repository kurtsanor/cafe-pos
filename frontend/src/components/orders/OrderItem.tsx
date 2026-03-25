import { ActionIcon, Image } from "@mantine/core";
import classes from "../../styles/OrderItem.module.css";
import { IconTrash } from "@tabler/icons-react";
import { Quantity } from "./Quantity";
import type { OrderEntry } from "../../types/order/order";

interface OrderItemProps {
  order: OrderEntry;
  handleIncrement: (productId: string) => void;
  handleDecrement: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

const OrderItem = ({
  order,
  handleIncrement,
  handleDecrement,
  removeFromCart,
}: OrderItemProps) => {
  return (
    <div className={classes.item}>
      <Image
        src={order.product.imageUrl}
        alt="product image"
        fit="cover"
        fallbackSrc="https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_2560%2Cc_limit/HLY-Veggie-Ramen-16x9.jpg"
        radius={"xs"}
        h={50}
        w={50}
      />
      <section className={classes.item__section_labels}>
        <p className={classes.item__title} title={order.product.name}>
          {order.product.name}
        </p>
        <Quantity
          order={order}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          removeFromCart={removeFromCart}
        />
        {/* <NumberInput size="xs" w={55} allowNegative={false} max={999} mt={2} /> */}
      </section>
      <div className={classes.item__section_right}>
        <p className={classes.item__price}>
          ₱{order.product.price * order.quantity}
        </p>
        <ActionIcon
          variant="light"
          color="red"
          size={18}
          ml="xs"
          onClick={() => removeFromCart(order.product._id)}
        >
          <IconTrash />
        </ActionIcon>
      </div>
    </div>
  );
};

export default OrderItem;
