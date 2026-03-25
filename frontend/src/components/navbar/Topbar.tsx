import { Group, Image, TextInput } from "@mantine/core";
import classes from "../../styles/Topbar.module.css";
import { IconCoffee, IconSearch } from "@tabler/icons-react";
import logo from "../../assets/mock logo.avif";

const Topbar = () => {
  return (
    <header className={classes.topbar}>
      <Group gap={5}>
        <Image src={logo} fit="cover" h={50} w={55} />
        <h3 className={classes.topbar__title}>Sunbrew Café</h3>
      </Group>

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
