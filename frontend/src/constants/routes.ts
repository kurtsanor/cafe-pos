import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
} from "@tabler/icons-react";

export const sidebarRoutes = [
  { icon: IconHome2, label: "Home", to: "/dashboard" },
  { icon: IconGauge, label: "Menu", to: "/menu" },
  { icon: IconDeviceDesktopAnalytics, label: "Orders", to: "/orders" },
  { icon: IconCalendarStats, label: "Products", to: "/products" },
];
