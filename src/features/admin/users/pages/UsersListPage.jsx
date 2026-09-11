// src/features/admin/users/pages/UsersListPage.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../shared/components/DataTable";
import StatusToggle from "../../../../shared/components/StatusToggle";
import FormSelect from "../../../../shared/components/FormSelect";
import KpiCard from "../../../../shared/components/KpiCard";
import ConfirmModal from "../../../../shared/components/ConfirmModal";
import { useToast } from "../../../../shared/components/Toast";
import { useAuth } from "../../../login/hooks/useAuth";
import useUsersAdmin, { hasAssociatedOrders } from "../hooks/useUsersAdmin";
import UserFormModal from "../components/UserFormModal";
import RoleBadge from "../components/RoleBadge";
import { ROLE_OPTIONS, roleLabel } from "../utils/roles";
import "./UsersListPage.css";

const STATUS_OPTIONS = [
  { value: "activo", label: "Activo" },
  { value: "inactivo", label: "Inactivo" },
];

function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function UsersListPage() {
  const { users, createUser, updateUser, setActive, removeUser } = useUsersAdmin();
  const { showToast } = useToast();
  const { role: currentRole } = useAuth();
  const navigate = useNavigate();

  // Regla de negocio: "Solo los administradores podrán crear o
  // modificar empleados". Mientras no haya sesión de administrador,
  // el módulo queda en modo consulta (sin crear/editar/eliminar).
  const canManage = currentRole === "administrador";

  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [confirmTarget, setConfirmTarget] = useState(null);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      if (roleFilter && u.role !== roleFilter) return false;
      if (statusFilter === "activo" && u.active === false) return false;
      if (statusFilter === "inactivo" && u.active !== false) return false;
      return true;
    });
  }, [users, roleFilter, statusFilter]);

  const kpis = useMemo(() => {
    const total = users.length;
    const activos = users.filter((u) => u.active !== false).length;
    const admins = users.filter((u) => u.role === "administrador").length;
    return { total, activos, inactivos: total - activos, admins };
  }, [users]);

  function openCreate() {
    setEditingUser(null);
    setFormOpen(true);
  }

  function openEdit(user) {
    setEditingUser(user);
    setFormOpen(true);
  }

  async function handleFormSubmit(payload) {
    setSubmitting(true);
    try {
      if (editingUser) {
        await updateUser(editingUser.id, payload);
        showToast({
          type: "success",
          title: "Usuario actualizado",
          message: `Los datos de ${payload.fullName} se guardaron correctamente.`,
        });
      } else {
        await createUser(payload);
        showToast({
          type: "success",
          title: "Usuario creado",
          message: `${payload.fullName} ya puede iniciar sesión con el correo registrado.`,
        });
      }
      setFormOpen(false);
    } finally {
      setSubmitting(false);
    }
    // Los errores (ej. EMAIL_TAKEN) los captura el propio modal y no
    // deben cerrarlo, por eso no hay catch aquí — se relanzan solas.
  }

  async function handleToggleActive(user, value) {
    await setActive(user.id, value);
    showToast({
      type: value ? "success" : "warning",
      title: value ? "Usuario habilitado" : "Usuario deshabilitado",
      message: value
        ? `${user.fullName} ya puede acceder al sistema.`
        : `${user.fullName} no podrá iniciar sesión hasta que se vuelva a habilitar.`,
    });
  }

  function askDelete(user) {
    if (hasAssociatedOrders(user)) {
      showToast({
        type: "error",
        title: "No se puede eliminar",
        message: `${user.fullName} tiene pedidos asociados. Elimínalo solo si ya no debe conservarse la trazabilidad.`,
      });
      return;
    }
    setConfirmTarget(user);
  }

  async function confirmDelete() {
    if (!confirmTarget) return;
    try {
      await removeUser(confirmTarget.id);
      showToast({
        type: "success",
        title: "Usuario eliminado",
        message: `${confirmTarget.fullName} perdió su acceso al sistema.`,
      });
    } catch (err) {
      showToast({
        type: "error",
        title: "No se pudo eliminar",
        message: err.message,
      });
    } finally {
      setConfirmTarget(null);
    }
  }

  const columns = [
    { key: "fullName", label: "Usuario" },
    { key: "email", label: "Correo" },
    {
      key: "role",
      label: "Rol",
      render: (row) => <RoleBadge role={row.role} />,
    },
    {
      key: "active",
      label: "Estado",
      render: (row) => (
        <div className="users-status-cell">
          <StatusToggle
            checked={row.active !== false}
            onChange={(v) => handleToggleActive(row, v)}
            disabled={!canManage}
          />
          <span>{row.active !== false ? "Activo" : "Inactivo"}</span>
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Creación",
      render: (row) => formatDate(row.createdAt),
    },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <div className="users-actions-cell">
          <i
            className="fa-solid fa-eye"
            title="Ver detalle"
            onClick={() => navigate(`/admin/usuarios/${row.id}`)}
          />
          {canManage && (
            <>
              <i
                className="fa-solid fa-pen users-action-edit"
                title="Editar"
                onClick={() => openEdit(row)}
              />
              <i
                className="fa-solid fa-trash users-action-delete"
                title="Eliminar"
                onClick={() => askDelete(row)}
              />
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="users-page">
        <div className="row users-kpis">
          <div className="col-12 col-sm-6 col-lg-3 users-col">
           
          </div>
          <div className="col-12 col-sm-6 col-lg-3 users-col">
           
          </div>
        </div>

        <DataTable
          title="Usuarios"
          description="Administra el personal autorizado y sus roles de acceso al sistema."
          createLabel={canManage ? "Crear usuario" : undefined}
          onCreate={openCreate}
          columns={columns}
          data={filtered}
          searchPlaceholder="Buscar usuario por nombre o correo..."
          emptyMessage="No se encontraron usuarios con esos criterios."
          extraFilter={
            <div className="users-extra-filters">
              <FormSelect
                value={roleFilter}
                onChange={setRoleFilter}
                placeholder="Todos los roles"
                options={ROLE_OPTIONS}
              />
              <FormSelect
                value={statusFilter}
                onChange={setStatusFilter}
                placeholder="Todos los estados"
                options={STATUS_OPTIONS}
              />
            </div>
          }
        />

        {!canManage && (
          <p className="users-readonly-hint">
            <i className="fa-solid fa-circle-info" /> Inicia sesión como administrador para
            crear, editar o eliminar usuarios. Con la sesión actual solo puedes consultar el
            listado.
          </p>
        )}
      </div>

      <UserFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
        submitting={submitting}
      />

      <ConfirmModal
        open={!!confirmTarget}
        onClose={() => setConfirmTarget(null)}
        onConfirm={confirmDelete}
        variant="danger"
        title="¿Eliminar este usuario?"
        description={
          confirmTarget
            ? `${confirmTarget.fullName} (${roleLabel(
                confirmTarget.role
              )}) perderá su acceso al sistema de inmediato. Esta acción no se puede deshacer.`
            : ""
        }
        confirmLabel="Sí, eliminar"
      />
    </>
  );
}
