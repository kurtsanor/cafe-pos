import { IconHome2 } from "@tabler/icons-react";
import { Stack, UnstyledButton } from "@mantine/core";
import classes from "../../styles/Navbar.module.css";
import { sidebarRoutes } from "../../constants/routes";
import { Link, useLocation } from "react-router-dom";

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
      className={classes.link}
      data-active={active || undefined}
      aria-label={label}
      component={Link}
      to={to!!}
    >
      <Icon
        data-active={active || undefined}
        className={classes.link__icon}
        size={18}
      />
      <span data-active={active || undefined} className={classes.link__label}>
        {label}
      </span>
    </UnstyledButton>
  );
};

const Sidebar = () => {
  const location = useLocation();

  const links = sidebarRoutes.map((group) => {
    const routes = group.routes.map((route) => (
      <SidebarLink
        {...route}
        key={route.label}
        active={route.to === location.pathname}
      />
    ));
    return (
      <div className={classes.category_container}>
        <p className={classes.group__title}>{group.category}</p>
        {routes}
      </div>
    );
  });

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={5}>
          {links}
        </Stack>
      </div>
    </nav>
  );
};

export default Sidebar;
