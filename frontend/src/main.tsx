import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/charts/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./config/theme.ts";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "./constants/modals.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <ModalsProvider modals={modals}>
          <App />
        </ModalsProvider>
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
);
