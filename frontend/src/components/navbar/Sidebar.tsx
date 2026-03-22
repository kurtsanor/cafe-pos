import { useState } from "react";
import { IconHome2, IconLogout } from "@tabler/icons-react";
import { Stack, UnstyledButton } from "@mantine/core";
import classes from "../../styles/Navbar.module.css";
import { sidebarRoutes } from "../../constants/routes";

interface SidebarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: SidebarLinkProps) => {
  return (
    <UnstyledButton
      onClick={onClick}
      className={classes.link}
      data-active={active || undefined}
      aria-label={label}
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
  const [active, setActive] = useState(1);

  const links = sidebarRoutes.map((link, index) => (
    <SidebarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => setActive(index)}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={0}>
        <SidebarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
};

export default Sidebar;
