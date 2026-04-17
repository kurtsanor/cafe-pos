import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { ContextModalProps } from "@mantine/modals";
import type {
  Category,
  CreateCategoryDto,
} from "../../types/categories/category";
import type { ApiResponse } from "../../types/response/apiResponse";
import { createCategory } from "../../api/categories.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { IconCheckFilled } from "@tabler/icons-react";

const CategoryFormModal = ({ id, context }: ContextModalProps) => {
  const closeModal = () => context.closeModal(id);

  const queryClient = useQueryClient();

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
    },
    validate: {
      name: (val) => (val ? null : "This field is required"),
      description: (val) => (val ? null : "This field is required"),
    },
  });

  const createMutation = useMutation<
    ApiResponse<Category>, // return type
    Error, // type of error
    CreateCategoryDto // input type
  >({
    mutationFn: createCategory,
    onSuccess: (response) => {
      // invalidate the cache
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      // close modal after refreshing data
      closeModal();

      // show notification
      notifications.show({
        color: "var(--pos-pop)",
        icon: <IconCheckFilled />,
        message: response.message,
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

  const isPending = createMutation.isPending;

  return (
    <form onSubmit={form.onSubmit(() => createMutation.mutate(form.values))}>
      <Stack gap={"xs"}>
        <TextInput
          size="xs"
          label="Category"
          placeholder="Enter category name"
          {...form.getInputProps("name")}
          disabled={isPending}
        />
        <Textarea
          size="xs"
          label="Description"
          placeholder="Enter category description"
          {...form.getInputProps("description")}
          disabled={isPending}
        />

        <Group justify="flex-end">
          <Button variant="default" onClick={closeModal} disabled={isPending}>
            Cancel
          </Button>
          <Button type="submit" loading={isPending}>
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default CategoryFormModal;
