import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { EventContextProvider } from "./context/EventContext.tsx";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <EventContextProvider>
        <App />
      </EventContextProvider>
    </AuthProvider>
  </React.StrictMode>
);
