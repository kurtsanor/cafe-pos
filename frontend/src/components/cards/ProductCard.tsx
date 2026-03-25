import { Card, Image } from "@mantine/core";
import classes from "../../styles/ProductCard.module.css";
import type { Product } from "../../types/product/product";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <Card
      shadow="xs"
      onClick={() => onClick(product)}
      className={classes.product}
    >
      <Card.Section className={classes.product__image}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fit="cover"
          fallbackSrc="https://assets.bonappetit.com/photos/5e3c7a3c866b940008106763/1:1/w_2560%2Cc_limit/HLY-Veggie-Ramen-16x9.jpg"
          radius={"xs"}
          h={150}
        />
      </Card.Section>
      <Card.Section p={"xs"}>
        <p className={classes.product__title}>{product.name}</p>
        <p className={classes.product__price}>{`₱${product.price}`}</p>
      </Card.Section>
    </Card>
  );
};

export default ProductCard;
