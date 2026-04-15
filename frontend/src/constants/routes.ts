import {
  IconHome2,
  IconPackage,
  IconReceipt,
  IconCalculator,
} from "@tabler/icons-react";

export const sidebarRoutes = [
  {
    category: "Main",
    routes: [
      { icon: IconHome2, label: "Dashboard", to: "/dashboard" },
      { icon: IconCalculator, label: "Point of Sale", to: "/menu" },
    ],
  },
  {
    category: "Inventory Management",
    routes: [{ icon: IconPackage, label: "Products", to: "/products" }],
  },
  {
    category: "Sales & Orders",
    routes: [{ icon: IconReceipt, label: "Orders", to: "/orders" }],
  },
];
