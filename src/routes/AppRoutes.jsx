// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Layout de la tienda
import StoreLayout from "../shared/components/StoreLayout";

// Páginas Públicas
import HomePage from "../features/home/pages/HomePage";
import ProductCatalog from "../features/catalog/pages/ProductCatalog";
import ProductDetail from "../features/catalog/pages/ProductDetail";
import CartPage from "../features/cart/pages/CartPage";
import CheckoutPage from "../features/cart/pages/CheckoutPage";
import ReviewsPage from "../features/reviews/pages/ReviewsPage";
import AboutPage from "../features/about/pages/AboutPage";

// Gestión de acceso (Login, Registro, Recuperación)
import LoginPage from "../features/login/pages/LoginPage";
import RegisterPage from "../features/login/pages/RegisterPage";
import ForgotPasswordPage from "../features/login/pages/ForgotPasswordPage";
import ChangePasswordPage from "../features/login/pages/ChangePasswordPage";
import RequireAuth from "../shared/components/RequireAuth";

// Módulo de Rutas de Administración
import AdminRoutes from "./AdminRoutes";

export default function AppRoutes() {
  return (
    <Routes>
      {/* --- TIENDA PÚBLICA (Con Navbar y Footer de StoreLayout) --- */}
      <Route element={<StoreLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/productos" element={<ProductCatalog />} />
        <Route path="/productos/:id" element={<ProductDetail />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/carrito/pago" element={<CheckoutPage />} />
        <Route path="/reseñas" element={<ReviewsPage />} />
        <Route path="/conocenos" element={<AboutPage />} />
      </Route>

      {/* --- GESTIÓN DE ACCESO --- */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />
      <Route path="/recuperar-contrasena" element={<ForgotPasswordPage />} />
      <Route
        path="/cambiar-contrasena"
        element={
          <RequireAuth>
            <ChangePasswordPage />
          </RequireAuth>
        }
      />
       
      {/* --- PANEL DE ADMINISTRACIÓN (Delegado a AdminRoutes.jsx) --- */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}