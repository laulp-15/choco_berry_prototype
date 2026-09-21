// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import 'bootstrap/dist/css/bootstrap.min.css';

// Importaciones de contextos globales
import { AuthProvider } from "./features/login/context/AuthContext"; 
import { ToastProvider } from "./shared/components/Toast"; // 👈 1. Importa el ToastProvider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>     {/* 👈 2. Envuélvelo aquí para que esté disponible en toda la app */}
          <App />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);