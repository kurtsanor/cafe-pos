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
import { IconCheck, IconCurrencyPeso, IconPhoto } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { useEffect, useState } from "react";

const ProductFormModal = ({ id, context, innerProps }: ContextModalProps) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview); // cleanup on unmount
    };
  }, [preview]);

  const handleDrop = (files: File[]) => {
    if (preview) URL.revokeObjectURL(preview); // remove old image from memory first
    const url = URL.createObjectURL(files[0]);
    setPreview(url);
  };

  const closeModal = () => context.closeModal(id);

  return (
    <Stack gap={"xs"}>
      <Dropzone
        onDrop={handleDrop}
        onReject={(files) => console.log("rejected", files)}
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
      />
      <Select
        size="xs"
        label="Product Category"
        placeholder="Select Category"
        data={PRODUCT_CATEGORIES}
      />
      <NumberInput
        leftSection={<IconCurrencyPeso size={16} />}
        size="xs"
        label="Product Price"
        min={1}
        placeholder="Enter product price"
      />
      <Group justify="flex-end">
        <Button variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button leftSection={<IconCheck size={16} />}>Save</Button>
      </Group>
    </Stack>
  );
};

export default ProductFormModal;
