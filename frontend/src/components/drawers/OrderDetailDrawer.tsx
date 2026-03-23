import { Divider, SimpleGrid, Stack } from "@mantine/core";
import classes from "../../styles/OrderDetail.module.css";

const OrderDetailDrawer = () => {
  return (
    <Stack>
      <h5>Summary</h5>
      <Divider />
      <SimpleGrid cols={2} mb="lg">
        <span>Order ID</span>
        <span>#0857124</span>
        <span>Time</span>
        <span>09:56:00</span>
      </SimpleGrid>
      <h5>Items</h5>
      <Divider />
      <SimpleGrid cols={2} mb="lg">
        <span>
          <span className={classes.quantity}>2 x</span> Schezwan Egg Noodles
        </span>
        <span>$49.00</span>
        <span>
          <span className={classes.quantity}>2 x</span> Schezwan Egg Noodles
        </span>
        <span>$49.00</span>
      </SimpleGrid>
      <Divider />
      <SimpleGrid cols={2} mb="lg">
        <h4>Total</h4>
        <h4>$249.99</h4>
      </SimpleGrid>
    </Stack>
  );
};

export default OrderDetailDrawer;
