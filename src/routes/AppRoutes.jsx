import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../features/home/pages/HomePage";
import ProductCatalog from "../features/catalog/pages/ProductCatalog";
import ProductDetail from "../features/catalog/pages/ProductDetail";
import ReviewsPage from "../features/reviews/pages/ReviewsPage";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rutas para la vista Home */}
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />

      {/* Rutas de catálogo */}
      <Route path="/productos" element={<ProductCatalog />} />
      <Route path="/productos/:id" element={<ProductDetail />} />

      {/* Ruta para la vista de Reseñas */}
      <Route path="/reseñas" element={<ReviewsPage />} />

      {/* Redirección por defecto si la ruta no existe */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}