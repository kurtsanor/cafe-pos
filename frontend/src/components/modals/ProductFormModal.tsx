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
  IconX,
} from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product, UpdateProductInput } from "../../types/product/product";
import { createProduct, updateProduct } from "../../api/product.api";
import type { ApiResponse } from "../../types/response/apiResponse";
import { notifications } from "@mantine/notifications";

const ProductFormModal = ({
  id,
  context,
  innerProps,
}: ContextModalProps<{ product: Product }>) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const isEditMode = !!innerProps.product;

  const isUnchangedImage = preview === innerProps.product?.imageUrl;

  useEffect(() => {
    if (!preview && innerProps.product?.imageUrl) {
      setPreview(innerProps.product.imageUrl);
    }
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
      name: innerProps.product?.name || "",
      category: innerProps.product?.category || "",
      price: innerProps.product?.price || 0,
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
      // invalidate the cache
      queryClient.invalidateQueries({ queryKey: ["products"] });

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

  const updateMutation = useMutation<
    ApiResponse<Product>, // return type
    Error, // type of error
    UpdateProductInput // input type
  >({
    mutationFn: updateProduct,
    onSuccess: (response) => {
      // invalidate the cache
      queryClient.invalidateQueries({ queryKey: ["products"] });

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

  const isPending = createMutation.isPending || updateMutation.isPending;

  const create = async () => {
    if (file && file.size > 5 * 1024 * 1024) {
      notifications.show({
        color: "red",
        icon: <IconX />,
        message: "File too large. Max size is 5 mb",
        position: "bottom-left",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", form.values.name);
    formData.append("category", form.values.category);
    formData.append("price", String(form.values.price));

    if (file && !isEditMode) {
      formData.append("image", file);
    }

    if (
      isEditMode &&
      !isUnchangedImage &&
      file &&
      innerProps.product.imagePublicId
    ) {
      formData.append("image", file);
      formData.append("imagePublicId", innerProps.product.imagePublicId);
    }

    if (isEditMode) {
      const updatePayload: UpdateProductInput = {
        id: innerProps.product?._id,
        data: formData,
      };
      updateMutation.mutate(updatePayload);
      return;
    }

    createMutation.mutate(formData);
  };

  return (
    <form onSubmit={form.onSubmit(create)}>
      <Stack gap={"xs"}>
        <Dropzone
          disabled={isPending}
          onDrop={handleDrop}
          onReject={(files) => {
            notifications.show({
              color: "red",
              icon: <IconX />,
              message: files[0].errors[0].message,
              position: "bottom-left",
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
          disabled={isPending}
          {...form.getInputProps("name")}
        />
        <Select
          size="xs"
          label="Product Category"
          placeholder="Select Category"
          data={PRODUCT_CATEGORIES}
          disabled={isPending}
          {...form.getInputProps("category")}
        />
        <NumberInput
          leftSection={<IconCurrencyPeso size={16} />}
          size="xs"
          label="Product Price"
          placeholder="Enter product price"
          disabled={isPending}
          {...form.getInputProps("price")}
        />
        <Group justify="flex-end">
          <Button variant="default" onClick={closeModal} disabled={isPending}>
            Cancel
          </Button>
          <Button
            leftSection={<IconCheck size={16} />}
            type="submit"
            loading={isPending}
          >
            {isEditMode ? "Update" : "Save"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default ProductFormModal;
