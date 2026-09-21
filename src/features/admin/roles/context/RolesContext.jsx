// src/features/admin/roles/context/RolesContext.jsx

import React, { createContext, useContext } from "react";
import useRoles from "../hooks/useRoles";

const RolesContext = createContext(null);

export function RolesProvider({ children }) {
  const value = useRoles();

  return (
    <RolesContext.Provider value={value}>
      {children}
    </RolesContext.Provider>
  );
}

export function useRolesContext() {
  const context = useContext(RolesContext);

  if (!context) {
    throw new Error(
      "useRolesContext debe usarse dentro de <RolesProvider>"
    );
  }

  return context;
}