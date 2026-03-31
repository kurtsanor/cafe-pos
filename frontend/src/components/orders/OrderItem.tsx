import { ActionIcon, Image } from "@mantine/core";
import classes from "../../styles/OrderItem.module.css";
import { IconTrash, IconX } from "@tabler/icons-react";
import { Quantity } from "./Quantity";
import type { OrderItem as IOrderItem } from "../../types/orderItem/orderItem";
import { formatToTwoDecimals } from "../../utils/currencyFormatter";

interface OrderItemProps {
  order: IOrderItem;
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
      <section className={classes.item__section_container}>
        <div className={classes.item__section_labels}>
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
        </div>

        <div className={classes.item__section_right}>
          <p className={classes.item__price}>
            ₱{formatToTwoDecimals(order.product.price * order.quantity)}
          </p>
          <ActionIcon
            radius={"lg"}
            variant="light"
            size={16}
            ml="xs"
            onClick={() => removeFromCart(order.product._id)}
            className={classes.remove_icon}
          >
            <IconX color="white" />
          </ActionIcon>
        </div>
      </section>
    </div>
  );
};

export default OrderItem;
