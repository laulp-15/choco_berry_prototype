// src/shared/components/RequireAuth.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../features/login/hooks/useAuth";

/**
 * Protege una ruta: si no hay sesión, redirige a /login (recordando de
 * dónde venía en location.state.from para volver ahí después).
 * Si se pasa allowedRoles y el rol del usuario no está incluido,
 * redirige a la home pública en vez de mostrar la vista.
 *
 * Uso:
 *   <Route path="/admin" element={
 *     <RequireAuth allowedRoles={["administrador"]}>
 *       <AdminLayout />
 *     </RequireAuth>
 *   } />
 */
export default function RequireAuth({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/productos" replace />;
  }

  return children;
}
