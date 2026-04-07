import { Stack, Group, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

interface OrderFilterPopoverProps {
  onApply: (from: string, to: string) => void;
}

const OrderFilterPopover = ({ onApply }: OrderFilterPopoverProps) => {
  const form = useForm({
    initialValues: {
      from: null,
      to: null,
    },
    validate: {
      from: (val) => (val ? null : "Required"),
      to: (val) => (val ? null : "Required"),
    },
  });

  const handleSubmit = () => {
    if (!form.values.from || !form.values.to) {
      return;
    }
    onApply(form.values.from, form.values.to);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} onReset={form.onReset}>
      <Stack>
        <Group>
          <DatePickerInput
            flex={1}
            label="From"
            placeholder="Pick date"
            size="xs"
            {...form.getInputProps("from")}
          />
          <DatePickerInput
            flex={1}
            label="To"
            placeholder="Pick date"
            size="xs"
            {...form.getInputProps("to")}
          />
        </Group>
        <Group>
          <Button flex={1} size="xs" variant="default" type="reset">
            Clear
          </Button>
          <Button flex={1} size="xs" variant="filled" type="submit">
            Apply
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default OrderFilterPopover;
