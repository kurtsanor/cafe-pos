import { Card, Image } from "@mantine/core";
import classes from "../../styles/ProductCard.module.css";

const ProductCard = () => {
  return (
    <Card shadow="xs">
      <Card.Section className={classes.product__image}>
        <Image
          src="https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_2560%2Cc_limit/HLY-Veggie-Ramen-16x9.jpg"
          alt="Tesla Model S"
          fit="cover"
          radius={"xs"}
        />
      </Card.Section>
      <Card.Section p={"xs"}>
        <p className={classes.product__title}>Schezwan Egg Noodles (Large)</p>
        <p className={classes.product__price}>$24.00</p>
      </Card.Section>
    </Card>
  );
};

export default ProductCard;
