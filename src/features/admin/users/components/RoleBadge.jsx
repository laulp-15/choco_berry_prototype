// src/features/admin/users/components/RoleBadge.jsx
import React from "react";
import { roleLabel } from "../utils/roles";
import "./RoleBadge.css";

export default function RoleBadge({ role }) {
  return <span className={`role-badge role-badge--${role}`}>{roleLabel(role)}</span>;
}
