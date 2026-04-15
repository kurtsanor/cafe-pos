import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
import classes from "../../styles/CategoryButtons.module.css";
import type { Category } from "../../types/categories/category";
import { Fragment } from "react/jsx-runtime";

interface CategoryButtonsProps {
  categories: Category[];
  value: string;
  onClick: (category: string) => void;
}

const CategoryButtons = ({
  categories,
  value,
  onClick,
}: CategoryButtonsProps) => {
  const categoryButtons = categories?.map((category, i) => {
    // If its the starting category, insert "All" option
    if (i == 0) {
      return (
        <Fragment key={category._id}>
          <Carousel.Slide>
            <Button
              onClick={() => onClick("All")}
              data-active={"All" === value || undefined}
              size="xs"
              variant="white"
              className={classes.button}
            >
              All
            </Button>
          </Carousel.Slide>
          <Carousel.Slide key={category?._id}>
            <Button
              onClick={() => onClick(category?.name)}
              data-active={category?.name === value || undefined}
              size="xs"
              variant="white"
              className={classes.button}
            >
              {category?.name}
            </Button>
          </Carousel.Slide>
        </Fragment>
      );
    }
    // If "All" category is already inserted, return the other categories
    return (
      <Carousel.Slide key={category?._id}>
        <Button
          onClick={() => onClick(category?.name)}
          data-active={category?.name === value || undefined}
          size="xs"
          variant="white"
          className={classes.button}
        >
          {category?.name}
        </Button>
      </Carousel.Slide>
    );
  });

  return (
    <Carousel
      emblaOptions={{ slidesToScroll: 3 }}
      px={"lg"}
      controlsOffset={0}
      type="container"
      slideSize={30}
      slideGap={"xs"}
    >
      {categoryButtons}
    </Carousel>
  );
};

export default CategoryButtons;
