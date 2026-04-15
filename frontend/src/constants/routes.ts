import {
  IconHome2,
  IconPackage,
  IconReceipt,
  IconCalculator,
  IconCategory,
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
    routes: [
      { icon: IconPackage, label: "Products", to: "/products" },
      { icon: IconCategory, label: "Categories", to: "/categories" },
    ],
  },
  {
    category: "Sales & Orders",
    routes: [{ icon: IconReceipt, label: "Orders", to: "/orders" }],
  },
];
