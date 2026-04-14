import { NumberInput, ActionIcon, Group } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { OrderItem } from "../../types/orderItem/orderItem";
import classes from "../../styles/OrderItem.module.css";

interface QuantityProps {
  order: OrderItem;
  handleIncrement: (productId: string) => void;
  handleDecrement: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

export function Quantity({
  order,
  handleIncrement,
  handleDecrement,
}: QuantityProps) {
  return (
    <Group gap={0} w={"fit-content"} className={classes.quantity__container}>
      <ActionIcon
        disabled={order.quantity == 1}
        variant="transparent"
        onClick={() => handleDecrement(order.product._id)}
        className={classes.quantity__buttons}
      >
        <IconMinus size={16} />
      </ActionIcon>

      <NumberInput
        variant="unstyled"
        value={order.quantity}
        hideControls
        min={1}
        size="xs"
        w={43}
        styles={{ input: { textAlign: "center", border: "none" } }}
        readOnly
      />

      <ActionIcon
        variant="transparent"
        onClick={() => handleIncrement(order.product._id)}
        className={classes.quantity__buttons}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
}
