import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { StudentProvider } from "./StudentContext.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <ErrorBoundary>
    <BrowserRouter>
      <StudentProvider>
        <App />
      </StudentProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
