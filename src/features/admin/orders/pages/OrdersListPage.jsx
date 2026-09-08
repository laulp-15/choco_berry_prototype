// src/features/admin/orders/pages/OrdersListPage.jsx
import React, { useState } from "react";
import DataTable from "../../../../shared/components/DataTable";
import FormSelect from "../../../../shared/components/FormSelect";
import ConfirmModal from "../../../../shared/components/ConfirmModal";
import OrderStatusBadge from "../components/OrderStatusBadge";
import OrderFormModal from "../components/OrderFormModal";
import OrderDetailModal from "../components/OrderDetailModal";
import { ORDER_STATUSES } from "../data/orderStatus";
import { INITIAL_ORDERS } from "../data/mockOrders";
import { formatPrice } from "../../../../shared/utils/formatPrice";

export default function OrdersListPage() {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [statusFilter, setStatusFilter] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);
  const [cancelingOrder, setCancelingOrder] = useState(null);

  const filtered = orders.filter((o) => !statusFilter || o.estado === statusFilter);

  const handleCreate = () => {
    setEditingOrder(null);
    setFormOpen(true);
  };

  const handleEdit = (order) => {
    if (order.estado === "cancelado") return;
    setEditingOrder(order);
    setFormOpen(true);
  };

  const handleSave = (order) => {
    if (editingOrder) {
      setOrders((prev) => prev.map((o) => (o.id === editingOrder.id ? { ...order, id: o.id } : o)));
    } else {
      const newId = Math.max(...orders.map((o) => o.id)) + 1;
      setOrders((prev) => [...prev, { ...order, id: newId }]);
    }
    setFormOpen(false);
  };

  const handleConfirmCancel = () => {
    setOrders((prev) =>
      prev.map((o) => (o.id === cancelingOrder.id ? { ...o, estado: "cancelado" } : o))
    );
  };

  const columns = [
    { key: "cliente", label: "Cliente" },
    { key: "direccion", label: "Dirección", render: (row) => row.direccion || "—" },
    { key: "fecha", label: "Fecha" },
    { key: "total", label: "Total", render: (row) => formatPrice(row.total) },
    { key: "estado", label: "Estado", render: (row) => <OrderStatusBadge status={row.estado} /> },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => {
        const isCancelled = row.estado === "cancelado";
        return (
          <div style={{ display: "flex", gap: "12px", color: "var(--texto-muted)" }}>
            <i
              className="fa-solid fa-eye"
              style={{ cursor: "pointer" }}
              title="Ver detalle"
              onClick={() => setDetailOrder(row)}
            />
            <i
              className="fa-solid fa-pen"
              style={{
                color: isCancelled ? "var(--borde)" : "var(--primario)",
                cursor: isCancelled ? "not-allowed" : "pointer",
              }}
              title={isCancelled ? "No se puede editar un pedido cancelado" : "Editar"}
              onClick={() => handleEdit(row)}
            />
            <i
              className="fa-solid fa-circle-xmark"
              style={{
                color: isCancelled ? "var(--borde)" : "#DD322D",
                cursor: isCancelled ? "not-allowed" : "pointer",
              }}
              title={isCancelled ? "Este pedido ya está cancelado" : "Cancelar pedido"}
              onClick={() => !isCancelled && setCancelingOrder(row)}
            />
          </div>
        );
      },
    },
  ];

  return (
    <>
      <DataTable
        title="Pedidos"
        description="Consulta y administra los pedidos del negocio."
        createLabel="Crear pedido"
        onCreate={handleCreate}
        columns={columns}
        data={filtered}
        searchPlaceholder="Buscar por cliente..."
        extraFilter={
          <div style={{ minWidth: "180px" }}>
            <FormSelect
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Todos los estados"
              options={ORDER_STATUSES}
            />
          </div>
        }
      />

      <OrderFormModal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        initialData={editingOrder}
        onSave={handleSave}
      />

      <OrderDetailModal
        open={Boolean(detailOrder)}
        onClose={() => setDetailOrder(null)}
        order={detailOrder}
      />

      <ConfirmModal
        open={Boolean(cancelingOrder)}
        onClose={() => setCancelingOrder(null)}
        onConfirm={handleConfirmCancel}
        variant="danger"
        title="Cancelar pedido"
        description={`El pedido de ${cancelingOrder?.cliente ?? ""} será cancelado y esta acción no se puede deshacer.`}
        confirmLabel="Sí, cancelar pedido"
        cancelLabel="Volver"
      />
    </>
  );
}