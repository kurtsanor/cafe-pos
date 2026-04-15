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
import logo from "../../assets/fluxposlogo.avif";
import { useState } from "react";
import { sidebarRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const [opened, setIsOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const routes = sidebarRoutes.map((category) => {
    const navRoutes = category.routes.map((route) => (
      <Button
        key={route.label}
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
    return navRoutes;
  });

  return (
    <header className={classes.topbar}>
      <Group gap={5} align="start">
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

        <Image src={logo} fit="cover" h={35} w={40} mr={5} />
        <Stack gap={0}>
          <span className={classes.topbar__title}>Flux POS</span>
          <p className={classes.topbar__subHeader}>Enterprise</p>
        </Stack>
      </Group>

      <TextInput
        leftSection={<IconSearch size={16} />}
        size="xs"
        placeholder="Search products...."
      />
    </header>
  );
};

export default Topbar;
