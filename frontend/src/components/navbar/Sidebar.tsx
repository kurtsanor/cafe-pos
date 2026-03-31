import { IconHome2, IconLogout } from "@tabler/icons-react";
import { Stack, UnstyledButton } from "@mantine/core";
import classes from "../../styles/Navbar.module.css";
import { sidebarRoutes } from "../../constants/routes";
import { Link, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "../../types/response/apiResponse";
import { logout } from "../../api/auth.api";
import { clearAccessToken } from "../../store/auth.store";

interface SidebarLinkProps {
  icon: typeof IconHome2;
  label: string;
  to?: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({ icon: Icon, label, to, active }: SidebarLinkProps) => {
  return (
    <UnstyledButton
      p={"xs"}
      className={classes.link}
      data-active={active || undefined}
      aria-label={label}
      component={Link}
      to={to!!}
    >
      <Icon
        data-active={active || undefined}
        className={classes.link__icon}
        size={20}
        stroke={1.5}
      />
      <span data-active={active || undefined} className={classes.link__label}>
        {label}
      </span>
    </UnstyledButton>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const logoutMutation = useMutation<ApiResponse<null>, Error>({
    mutationFn: logout,
    onSuccess: () => {
      clearAccessToken();
      window.location.href = "/";
    },
  });

  const links = sidebarRoutes.map((link) => (
    <SidebarLink
      {...link}
      key={link.label}
      active={link.to === location.pathname}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={5}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <UnstyledButton
          p={"xs"}
          className={classes.link}
          onClick={() => logoutMutation.mutate()}
        >
          <IconLogout className={classes.link__icon} size={20} stroke={1.5} />
          <span className={classes.link__label}>Logout</span>
        </UnstyledButton>
      </Stack>
    </nav>
  );
};

export default Sidebar;
