// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";

// Catálogo
import ProductCatalog from "../features/catalog/pages/ProductCatalog";
import ProductDetail from "../features/catalog/pages/ProductDetail";

// Carrito
import CartPage from "../features/cart/pages/CartPage";
import CheckoutPage from "../features/cart/pages/CheckoutPage";

// Conócenos (pestaña del Home)
import AboutPage from "../features/about/pages/AboutPage";
// Admin
import AdminLayout from "../shared/layouts/AdminLayout";
import DashboardPage from "../features/admin/dashboard/pages/DashboardPage";
import RolesListPage from "../features/admin/roles/pages/RolesListPage";
// import UsersListPage from "../features/admin/users/pages/UsersListPage";
// import ProductsListPage from "../features/admin/products/pages/ProductsListPage";
// ...cada compañera agrega la suya aquí mismo cuando la tenga lista

export default function AppRoutes() {
  return (
    <Routes>
      {/* --- Público / tienda --- */}
      <Route path="/" element={<Navigate to="/productos" replace />} />
      <Route path="/productos" element={<ProductCatalog />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
      <Route path="/carrito" element={<CartPage />} />
      <Route path="/carrito/pago" element={<CheckoutPage />} />
 
 
  {/* Ruta temporal solo para previsualizar "Conócenos" mientras se arma
          el Home con pestañas. Cuando el Home esté listo, este componente
          se debe importar allá como una pestaña y esta línea se puede quitar. */}
      <Route path="/conocenos" element={<AboutPage />} />



      {/* --- Admin: AdminLayout es la ruta padre, todo lo demás es hijo ---
          Dashboard vive en la ruta índice ("/admin" exacto), porque así
          es como lo espera el NavLink del sidebar (to="/admin", end). */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="roles" element={<RolesListPage />} />
        {/* <Route path="usuarios" element={<UsersListPage />} /> */}
        {/* <Route path="productos" element={<ProductsListPage />} /> */}
      </Route>
    </Routes>
  );
}