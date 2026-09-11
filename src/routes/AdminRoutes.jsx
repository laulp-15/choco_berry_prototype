
// src/routes/AdminRoutes.jsx

import { Routes, Route, Outlet } from "react-router-dom";

// Layout
import AdminLayout from "../shared/layouts/AdminLayout";

// Páginas de Administración
import DashboardPage from "../features/admin/dashboard/pages/DashboardPage";

import RolesListPage from "../features/admin/roles/pages/RolesListPage";

import { RolesProvider } from "../features/admin/roles/context/RolesContext";

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
    <Routes>
      <Route element={<AdminLayout />}>
        
        {/* Panel principal */}
        <Route index element={<DashboardPage />} />

         {/* Crear/Editar rol es un modal dentro de RolesListPage (RoleFormModal),
          no una ruta aparte — por eso aquí solo hay una entrada para "roles". */}
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


        <Route path="clientes" element={<CustomersListPage />} />

        {/* Catálogo de productos y reseñas */}
        <Route path="categorias" element={<CategoriesListPage />} />
        <Route path="productos" element={<ProductsListPage />} />
        <Route path="resenas" element={<ReviewsListPage />} />

        {/* Pedidos y ventas */}
        <Route path="pedidos" element={<OrdersListPage />} />
        <Route path="ventas" element={<SalesListPage />} />
        <Route path="ventas/:id" element={<SaleDetailPage />} />

         <Route path="entregas" element={<DeliveriesListPage />} />

      </Route>
    </Routes>
  );
}

