import {
  Burger,
  Button,
  Group,
  Image,
  Menu,
  Popover,
  Stack,
  TextInput,
} from "@mantine/core";
import classes from "../../styles/Topbar.module.css";
import { IconLogout, IconSearch, IconUser } from "@tabler/icons-react";
import logo from "../../assets/fluxposlogo.avif";
import { useState } from "react";
import { sidebarRoutes } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth.api";
import { clearAccessToken } from "../../store/auth.store";
import type { ApiResponse } from "../../types/response/apiResponse";

const Topbar = () => {
  const [opened, setIsOpened] = useState<boolean>(false);
  const navigate = useNavigate();

  const logoutMutation = useMutation<ApiResponse<null>, Error>({
    mutationFn: logout,
    onSuccess: () => {
      clearAccessToken();
      window.location.href = "/";
    },
  });

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
      <Menu>
        <Menu.Target>
          <Button
            leftSection={<IconUser size={18} />}
            variant="default"
            size="xs"
          >
            Admin
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            fz={"xs"}
            leftSection={<IconLogout size={18} />}
            onClick={() => logoutMutation.mutate()}
          >
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </header>
  );
};

export default Topbar;
