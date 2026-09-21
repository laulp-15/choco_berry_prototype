// src/features/admin/sales/pages/SalesListPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../../../shared/components/DataTable";
import { INITIAL_ORDERS } from "../../orders/data/MockOrders";
import { PAYMENT_METHODS } from "../../../cart/data/paymentMethods";
import { formatPrice } from "../../../../shared/utils/formatPrice";

// Ventas = pedidos ya confirmados (en preparación o despachados).
// Los pendientes y cancelados NO son ventas todavía, no aparecen aquí.
const SALE_STATUSES = ["en_preparacion", "despachado"];

export default function SalesListPage() {
  const navigate = useNavigate();

  const sales = INITIAL_ORDERS.filter((o) => SALE_STATUSES.includes(o.estado));

  const handleGenerateReceipt = (row) => {
    console.log("TODO: generar comprobante digital (PDF) para el pedido", row.id);
  };

  const handleDownloadReceipt = (row) => {
    console.log("TODO: descargar comprobante digital (PDF) del pedido", row.id);
  };

  const columns = [
    { key: "cliente", label: "Cliente" },
    { key: "fecha", label: "Fecha" },
    {
      key: "medioPago",
      label: "Medio de pago",
      render: (row) => PAYMENT_METHODS.find((p) => p.value === row.medioPago)?.label ?? "—",
    },
    { key: "total", label: "Total", render: (row) => formatPrice(row.total) },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <div style={{ display: "flex", gap: "12px", color: "var(--texto-muted)" }}>
          <i
            className="fa-solid fa-eye"
            style={{ cursor: "pointer" }}
            title="Ver detalle"
            onClick={() => navigate(`/admin/ventas/${row.id}`)}
          />
          <i
            className="fa-solid fa-print"
            style={{ color: "var(--primario)", cursor: "pointer" }}
            title="Generar comprobante digital"
            onClick={() => handleGenerateReceipt(row)}
          />
          <i
            className="fa-solid fa-download"
            style={{ cursor: "pointer" }}
            title="Descargar comprobante"
            onClick={() => handleDownloadReceipt(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <DataTable
      title="Ventas"
      description="Consulta las ventas confirmadas del negocio."
      columns={columns}
      data={sales}
      searchPlaceholder="Buscar por cliente..."
    />
  );
}