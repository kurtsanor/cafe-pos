import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
  Text,
  Image,
} from "@mantine/core";
import type { ContextModalProps } from "@mantine/modals";
import { PRODUCT_CATEGORIES } from "../../constants/products";
import {
  IconCheck,
  IconCheckFilled,
  IconCurrencyPeso,
  IconPhoto,
} from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../../types/product/product";
import { createProduct } from "../../api/product.api";
import type { ApiResponse } from "../../types/response/apiResponse";
import { notifications } from "@mantine/notifications";

const ProductFormModal = ({ id, context, innerProps }: ContextModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview); // cleanup on unmount
    };
  }, [preview]);

  const handleDrop = (files: File[]) => {
    if (preview) URL.revokeObjectURL(preview); // remove old image from memory first
    const url = URL.createObjectURL(files[0]);
    setFile(files[0]);
    setPreview(url);
  };

  const closeModal = () => context.closeModal(id);

  const form = useForm({
    initialValues: {
      name: "",
      category: "",
      price: 0, // or "" if you want empty initially
    },
    validate: {
      name: (val) => (val ? null : "This field is required"),
      category: (val) => (val ? null : "This field is required"),
      price: (val) => {
        if (!val) return "This field is required";
        if (val < 0) {
          return "Cannot be negative";
        }
      },
    },
  });

  const createMutation = useMutation<
    ApiResponse<Product>, // return type
    Error, // type of error
    FormData // input type
  >({
    mutationFn: createProduct,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      closeModal();
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

  const create = async () => {
    if (file && file.size > 5 * 1024 * 1024) {
      notifications.show({
        message: "File too large. Max limit is 5mb",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", form.values.name);
    formData.append("category", form.values.category);
    formData.append("price", String(form.values.price));

    if (file) {
      formData.append("image", file);
    }

    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={form.onSubmit(create)}>
      <Stack gap={"xs"}>
        <Dropzone
          disabled={createMutation.isPending}
          onDrop={handleDrop}
          onReject={(files) => {
            notifications.show({
              message: files[0].errors[0].message,
            });
          }}
          accept={IMAGE_MIME_TYPE}
          maxSize={5 * 1024 ** 2}
          maxFiles={1}
        >
          {preview ? (
            <Image
              src={preview}
              alt="preview"
              fit="contain"
              h={150}
              radius="sm"
            />
          ) : (
            <Stack justify="center" align="center" mih={100}>
              <IconPhoto
                size={52}
                color="var(--mantine-color-dimmed)"
                stroke={1.5}
              />
              <div>
                <Text size="xs" inline mt={7}>
                  Drag product image here or click to select a file
                </Text>
                <Text size="xs" c="dimmed" inline mt={7} ta="center">
                  File should not exceed 5mb
                </Text>
              </div>
            </Stack>
          )}
        </Dropzone>

        <TextInput
          size="xs"
          label="Product Name"
          placeholder="Enter product name"
          disabled={createMutation.isPending}
          {...form.getInputProps("name")}
        />
        <Select
          size="xs"
          label="Product Category"
          placeholder="Select Category"
          data={PRODUCT_CATEGORIES}
          disabled={createMutation.isPending}
          {...form.getInputProps("category")}
        />
        <NumberInput
          leftSection={<IconCurrencyPeso size={16} />}
          size="xs"
          label="Product Price"
          placeholder="Enter product price"
          disabled={createMutation.isPending}
          {...form.getInputProps("price")}
        />
        <Group justify="flex-end">
          <Button
            variant="outline"
            onClick={closeModal}
            disabled={createMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            leftSection={<IconCheck size={16} />}
            type="submit"
            loading={createMutation.isPending}
          >
            Save
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ProductFormModal;
