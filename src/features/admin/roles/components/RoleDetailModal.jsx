// src/features/admin/roles/components/RoleDetailModal.jsx
import React from "react";
import Modal from "../../../../shared/components/Modal";
import RoleDetailContent from "./RoleDetailContent";

/**
 * @param {object} props
 * @param {boolean} props.open
 * @param {() => void} props.onClose
 * @param {object} props.role
 * @param {object[]} props.permissions
 */
export default function RoleDetailModal({ open, onClose, role, permissions }) {
  if (!role) return null;

  return (
    <Modal open={open} onClose={onClose} title={`Detalle del rol: ${role.name}`} maxWidth="sm">
      <RoleDetailContent role={role} permissions={permissions} />
    </Modal>
  );
}
