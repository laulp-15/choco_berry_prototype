// src/routes/AppRoutes.jsx

import { Routes, Route } from "react-router-dom";
import ProductCatalog from "../features/catalog/pages/ProductCatalog";
import ProductDetail from "../features/catalog/pages/ProductDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/productos" element={<ProductCatalog />} />
      <Route path="/productos/:id" element={<ProductDetail />} />
      {/* ...resto de tus rutas (home, cart, admin, etc.) */}
    </Routes>
  );
}