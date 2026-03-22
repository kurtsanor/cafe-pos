import { ActionIcon, Image, NumberInput, Paper } from "@mantine/core";
import classes from "../../styles/OrderItem.module.css";
import { IconX } from "@tabler/icons-react";
import { Quantity } from "./Quantity";

const OrderItem = () => {
  return (
    <div className={classes.item}>
      <Image
        src="https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_2560%2Cc_limit/HLY-Veggie-Ramen-16x9.jpg"
        alt="product image"
        fit="cover"
        radius={"xs"}
        h={50}
        w={50}
      />
      <section className={classes.item__section_labels}>
        <p className={classes.item__title} title="Schezwan Egg Noodles Premium">
          Schezwan Egg Noodles Premium
        </p>
        <Quantity />
        {/* <NumberInput size="xs" w={55} allowNegative={false} max={999} mt={2} /> */}
      </section>
      <p className={classes.item__price}>$24.00</p>
      <ActionIcon variant="light" color="red" size={18} ml="xs">
        <IconX />
      </ActionIcon>
    </div>
  );
};

export default OrderItem;
