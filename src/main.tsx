import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import SessionContextProvider from "./contexts/SessionContext.tsx";
import AppShellComponent from "./Components/AppShellComponent.js";

createRoot(document.getElementById("root")!).render(
    <MantineProvider>
      <SessionContextProvider>
        <BrowserRouter>
          <AppShellComponent />
        </BrowserRouter>
      </SessionContextProvider>
    </MantineProvider>
);
