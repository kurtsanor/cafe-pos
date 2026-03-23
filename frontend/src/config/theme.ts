import { createTheme } from "@mantine/core";

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
  },
});
