// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";

// Layout
import AdminLayout from "../shared/layouts/AdminLayout";

// Páginas de Administración
import DashboardPage from "../features/admin/dashboard/pages/DashboardPage";
import RolesListPage from "../features/admin/roles/pages/RolesListPage";
import CustomersListPage from "../features/admin/customers/pages/CustomersListPage";
import CategoriesListPage from "../features/admin/categories/pages/CategoriesListPage";
import ProductsListPage from "../features/admin/products/pages/ProductsListPage";
import ReviewsListPage from "../features/admin/admin-reviews/pages/ReviewsListPage";
import OrdersListPage from "../features/admin/orders/pages/OrdersListPage";
import SalesListPage from "../features/admin/sales/pages/SalesListPage";
import SaleDetailPage from "../features/admin/sales/pages/SaleDetailPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        {/* Panel principal */}
        <Route index element={<DashboardPage />} />

        {/* Usuarios y accesos */}
        <Route path="roles" element={<RolesListPage />} />
        <Route path="clientes" element={<CustomersListPage />} />

        {/* Catálogo de productos y reseñas */}
        <Route path="categorias" element={<CategoriesListPage />} />
        <Route path="productos" element={<ProductsListPage />} />
        <Route path="resenas" element={<ReviewsListPage />} />

        {/* Pedidos y ventas */}
        <Route path="pedidos" element={<OrdersListPage />} />
        <Route path="ventas" element={<SalesListPage />} />
        <Route path="ventas/:id" element={<SaleDetailPage />} />
      </Route>
    </Routes>
  );
}