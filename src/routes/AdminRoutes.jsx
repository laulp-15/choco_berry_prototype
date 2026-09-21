// src/routes/AdminRoutes.jsx

import { Routes, Route } from "react-router-dom";

// Layout
import AdminLayout from "../shared/layouts/AdminLayout";

// Providers necesarios para el panel de administración
import { AuthProvider } from "../features/login/context/AuthContext";
import { ToastProvider } from "../shared/components/Toast";
import { RolesProvider } from "../features/admin/roles/context/RolesContext";

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
import UsersListPage from "../features/admin/users/pages/UsersListPage";
import UserDetailPage from "../features/admin/users/pages/UserDetailPage";
import DeliveriesListPage from "../features/admin/deliveries/pages/DeliveriesListPage";

export default function AdminRoutes() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route element={<AdminLayout />}>
            
            {/* Panel principal */}
            <Route index element={<DashboardPage />} />

            {/* Roles */}
            <Route
              path="roles"
              element={
                <RolesProvider>
                  <RolesListPage />
                </RolesProvider>
              }
            />
            
            {/* Usuarios y accesos */}
            <Route path="usuarios" element={<UsersListPage />} />
            <Route path="usuarios/:id" element={<UserDetailPage />} />

            {/* Clientes */}
            <Route path="clientes" element={<CustomersListPage />} />

            {/* Catálogo de productos y reseñas */}
            <Route path="categorias" element={<CategoriesListPage />} />
            <Route path="productos" element={<ProductsListPage />} />
            <Route path="resenas" element={<ReviewsListPage />} />

            {/* Pedidos y ventas */}
            <Route path="pedidos" element={<OrdersListPage />} />
            <Route path="ventas" element={<SalesListPage />} />
            <Route path="ventas/:id" element={<SaleDetailPage />} />

            {/* Entregas */}
            <Route path="entregas" element={<DeliveriesListPage />} />

          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}