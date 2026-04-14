import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./config/theme.ts";
import { ModalsProvider } from "@mantine/modals";
import { modals } from "./constants/modals.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Notifications } from "@mantine/notifications";
import "@fontsource/inter/400.css"; // Body text
import "@fontsource/inter/500.css"; // Bold headers
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { Analytics } from "@vercel/analytics/react";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <BrowserRouter>
          <ModalsProvider modals={modals}>
            <Notifications />
            <Analytics />
            <App />
          </ModalsProvider>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
);
