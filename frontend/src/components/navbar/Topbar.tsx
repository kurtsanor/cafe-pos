import { TextInput } from "@mantine/core";
import classes from "../../styles/Topbar.module.css";
import { IconCoffee, IconSearch } from "@tabler/icons-react";

const Topbar = () => {
  return (
    <header className={classes.topbar}>
      <h2 className={classes.topbar__title}>
        <IconCoffee size={25} stroke={1.5} />
        BrewDesk
      </h2>
      <TextInput
        variant="filled"
        leftSection={<IconSearch size={16} />}
        size="xs"
        placeholder="Search products...."
      />
    </header>
  );
};

export default Topbar;
