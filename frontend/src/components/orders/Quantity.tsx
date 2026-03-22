import { useRef, useState } from "react";
import { NumberInput, ActionIcon, Group } from "@mantine/core";
import type { NumberInputHandlers } from "@mantine/core";
import { IconMinus, IconPlus } from "@tabler/icons-react";

export function Quantity() {
  const handlers = useRef<NumberInputHandlers | null>(null);
  const [value, setValue] = useState<number | "">(1);

  const handleChange = (val: string | number) => {
    if (val === "") {
      setValue("");
    } else if (!isNaN(Number(val))) {
      setValue(Number(val));
    }
  };

  return (
    <Group gap="xs">
      <ActionIcon
        variant="default"
        onClick={() => handlers.current?.decrement()}
      >
        <IconMinus size={16} />
      </ActionIcon>

      <NumberInput
        value={value}
        onChange={handleChange}
        handlersRef={handlers}
        hideControls
        min={1}
        size="xs"
        w={43}
        styles={{ input: { textAlign: "center" } }}
        readOnly
      />

      <ActionIcon
        variant="default"
        onClick={() => handlers.current?.increment()}
      >
        <IconPlus size={16} />
      </ActionIcon>
    </Group>
  );
}
