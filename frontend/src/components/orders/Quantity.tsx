import { NumberInput, ActionIcon, Group } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import type { OrderEntry } from "../../types/order/order";

interface QuantityProps {
  order: OrderEntry;
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
    <Group gap="xs">
      <ActionIcon
        disabled={order.quantity == 1}
        variant="default"
        onClick={() => handleDecrement(order.product._id)}
      >
        <IconMinus size={16} />
      </ActionIcon>

      <NumberInput
        value={order.quantity}
        hideControls
        min={1}
        size="xs"
        w={43}
        styles={{ input: { textAlign: "center" } }}
        readOnly
      />

      <ActionIcon
        variant="default"
        onClick={() => handleIncrement(order.product._id)}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
}
