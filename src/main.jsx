
// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import { AuthProvider } from "./features/login/hooks/useAuth.jsx";
import { ToastProvider } from "./shared/components/Toast.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shared/css/tokens.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

