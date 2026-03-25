import { useState } from "react";
import { IconHome2, IconLogout } from "@tabler/icons-react";
import { Stack, UnstyledButton } from "@mantine/core";
import classes from "../../styles/Navbar.module.css";
import { sidebarRoutes } from "../../constants/routes";
import { Link, useLocation, useNavigate } from "react-router-dom";

interface SidebarLinkProps {
  icon: typeof IconHome2;
  label: string;
  to: string;
  active?: boolean;
}

const SidebarLink = ({ icon: Icon, label, to, active }: SidebarLinkProps) => {
  return (
    <UnstyledButton
      className={classes.link}
      data-active={active || undefined}
      aria-label={label}
      component={Link}
      to={to}
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

  const links = sidebarRoutes.map((link, index) => (
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
        <SidebarLink to="/" icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
};

export default Sidebar;
