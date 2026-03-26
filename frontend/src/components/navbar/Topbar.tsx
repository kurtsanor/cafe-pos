import { Group, Image, TextInput } from "@mantine/core";
import classes from "../../styles/Topbar.module.css";
import { IconSearch } from "@tabler/icons-react";
import logo from "../../assets/mock logo.avif";

const Topbar = () => {
  return (
    <header className={classes.topbar}>
      <Group gap={5}>
        <Image src={logo} fit="cover" h={40} w={45} />
        <h3 className={classes.topbar__title}>SunbrewCafé</h3>
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
