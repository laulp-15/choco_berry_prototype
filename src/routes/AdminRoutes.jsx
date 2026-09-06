// src/routes/AdminRoutes.jsx (o donde ya tengan su router central)
//
// AdminLayout se declara UNA sola vez, como ruta padre.
// Cada módulo (roles, usuarios, productos...) agrega su propia ruta hija
// aquí, sin volver a escribir sidebar/topbar.

import { Route } from "react-router-dom";
import AdminLayout from "../shared/layouts/AdminLayout";
import DashboardPage from "../features/admin/dashboard/pages/DashboardPage";
import RolesListPage from "../features/admin/roles/pages/RolesListPage";
// import UsersListPage from "../features/admin/users/pages/UsersListPage";
// import ProductsListPage from "../features/admin/products/pages/ProductsListPage";
// ...así sucesivamente por cada módulo

export default function AdminRoutes() {
  return (
    <Route path="/admin" element={<AdminLayout />}>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="roles" element={<RolesListPage />} />
      {/* <Route path="usuarios" element={<UsersListPage />} /> */}
      {/* <Route path="productos" element={<ProductsListPage />} /> */}
    </Route>
  );
}