import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconCalendarStats,
  IconUser,
  IconFingerprint,
  IconSettings,
} from "@tabler/icons-react";

export const sidebarRoutes = [
  { icon: IconHome2, label: "Dashboard", to: "/dashboard" },
  { icon: IconGauge, label: "Menu", to: "/" },
  { icon: IconDeviceDesktopAnalytics, label: "Orders", to: "/orders" },
  { icon: IconCalendarStats, label: "Products", to: "/products" },
  { icon: IconUser, label: "Account", to: "" },
  { icon: IconFingerprint, label: "Security", to: "" },
  { icon: IconSettings, label: "Settings", to: "" },
];
