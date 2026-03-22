import { Button, SimpleGrid } from "@mantine/core";
import ProductCard from "../components/cards/ProductCard";
import classes from "../styles/Menu.module.css";
import { IconCircleArrowRight, IconCircleX } from "@tabler/icons-react";
import OrderItem from "../components/orders/OrderItem";

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

      {/* Order Entry Container */}
      <aside className={classes.main__order_entry}>
        {/* Order Entry Header */}
        <header className={classes.order_entry__header}>
          <h4>Order Entry</h4>
        </header>

        {/* Order Entry Body */}
        <main className={classes.order_entry__body}>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </main>

        {/* Order Entry Footer */}
        <footer className={classes.order_entry__footer}>
          <section className={classes.footer__total}>
            <h4>Total</h4>
            <h4>$195.00</h4>
          </section>
          <section className={classes.footer__buttons}>
            <Button
              fullWidth
              className={classes.footer__buttons_clear}
              leftSection={<IconCircleX size={16} stroke={1.5} />}
            >
              Clear Order
            </Button>
            <Button
              fullWidth
              className={classes.footer__buttons_place}
              leftSection={<IconCircleArrowRight size={16} stroke={1.5} />}
            >
              Place Order
            </Button>
          </section>
        </footer>
      </aside>
    </main>
  );
};

export default Menu;
