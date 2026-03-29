import {
  createTheme,
  Drawer,
  Notification,
  SegmentedControl,
} from "@mantine/core";
import { Notifications, notifications } from "@mantine/notifications";

const POS_ACCENT = "#fc8019";

export const theme = createTheme({
  primaryColor: "orange",
  primaryShade: 6,
  colors: {
    orange: [
      "#fff2e8",
      "#ffe0c4",
      "#ffc49a",
      "#ffa36e",
      "#ffb347",
      "#fd9535",
      POS_ACCENT,
      "#e5721a",
      "#cc6516",
      "#b35812",
    ],
  },
  components: {
    Select: {
      styles: {
        option: {
          fontSize: "var(--mantine-font-size-sm)",
          fontFamily: "var(--mantine-font-family)",
        },
      },
    },
    Modal: {
      styles: {
        title: {
          fontSize: "16px",
          fontWeight: 500,
          color: "#171826",
        },
      },
    },
    Drawer: {
      styles: {
        title: {
          fontSize: "18px",
          fontWeight: 500,
          color: "#171826",
        },
      },
    },
    Notification: {
      styles: {
        root: {
          display: "inline-flex",
          maxWidth: "400px",
        },
        description: {
          fontSize: "14px",
        },
        title: {
          fontSize: "var(--mantine-font-size-xs)",
        },
        icon: {
          width: 25,
          height: 25,
        },
      },
    },
    SegmentedControl: {
      styles: {
        root: {
          backgroundColor: "white",
        },
        indicator: {
          backgroundColor: "var(--pos-highlight)",
          border: "solid 1px",
          borderColor: "var(--pos-accent)",
          boxShadow: "none",
        },
        label: {
          // Target the active state specifically
          "&[data-active]": {
            color: "white",
          },

          // Target the hover state
          "&:hover": {
            color: "black",
          },
        },
      },
    },
  },
});
