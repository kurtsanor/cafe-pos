import { Carousel } from "@mantine/carousel";
import { Button } from "@mantine/core";
import classes from "../../styles/CategoryButtons.module.css";

interface CategoryButtonsProps {
  categories: string[];
  value: string;
  onClick: (category: string) => void;
}

const CategoryButtons = ({
  categories,
  value,
  onClick,
}: CategoryButtonsProps) => {
  const categoryButtons = categories.map((category) => (
    <Carousel.Slide key={category}>
      <Button
        onClick={() => onClick(category)}
        data-active={category === value || undefined}
        size="xs"
        variant="white"
        className={classes.button}
      >
        {category}
      </Button>
    </Carousel.Slide>
  ));

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
