import { SimpleGrid } from "@mantine/core";
import ProductCard from "../components/cards/ProductCard";
import classes from "../styles/Menu.module.css";

const Menu = () => {
  return (
    <main className={classes.main}>
      <article className={classes.main__menu}>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </SimpleGrid>
      </article>
      <aside className={classes.main__order_entry}>
        <h2>Order lists</h2>
      </aside>
    </main>
  );
};

export default Menu;
