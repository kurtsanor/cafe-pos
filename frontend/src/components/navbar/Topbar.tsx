import {
  Burger,
  Button,
  Group,
  Image,
  Popover,
  Stack,
  TextInput,
} from "@mantine/core";
import classes from "../../styles/Topbar.module.css";
import { IconSearch } from "@tabler/icons-react";
import logo from "../../assets/mock logo.avif";
import { useState } from "react";
import { sidebarRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [opened, setIsOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const routes = sidebarRoutes.map((route) => (
    <Button
      justify="start"
      variant="default"
      fullWidth
      leftSection={<route.icon size={16} />}
      onClick={() => {
        navigate(route.to);
        setIsOpened(false);
      }}
    >
      {route.label}
    </Button>
  ));

  return (
    <header className={classes.topbar}>
      <Group gap={5}>
        <Popover width={"100%"} opened={opened}>
          <Popover.Target>
            <Burger
              size={"sm"}
              opened={opened}
              onClick={() => setIsOpened((prev) => !prev)}
              hiddenFrom="sm"
            />
          </Popover.Target>
          <Popover.Dropdown h={"100%"}>
            <Stack gap={"xs"}>{routes}</Stack>
          </Popover.Dropdown>
        </Popover>

        <Image src={logo} fit="cover" h={30} w={40} />
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
