// src/features/admin/deliveries/pages/DeliveriesListPage.jsx
import React, { useState } from "react";
import DataTable from "../../../../shared/components/DataTable";
import FormSelect from "../../../../shared/components/FormSelect";
import DeliveryStatusBadge from "../components/DeliveryStatusBadge";
import DeliveryDetailModal from "../components/DeliveryDetailModal";
import { DELIVERY_STATUSES } from "../data/deliveryStatus";
import { INITIAL_DELIVERIES } from "../data/MockDeliveries";
import { formatPrice } from "../../../../shared/utils/formatPrice";

export default function DeliveriesListPage() {
  // TODO: reemplazar por fetch a la API real. El listado ya se refresca
  // solo al cambiar este estado (CA_60_02): cuando haya backend, este
  // set vendrá de una suscripción/polling en vez de datos fijos.
  const [deliveries] = useState(INITIAL_DELIVERIES);
  const [statusFilter, setStatusFilter] = useState("");
  const [detailDelivery, setDetailDelivery] = useState(null);

  const filtered = deliveries.filter((d) => !statusFilter || d.estado === statusFilter);

  const columns = [
    { key: "cliente", label: "Cliente" },
    { key: "direccion", label: "Dirección" },
    { key: "telefono", label: "Teléfono" },
    { key: "municipio", label: "Municipio" },

    { key: "fecha", label: "Fecha" },
    { key: "total", label: "Total", render: (row) => formatPrice(row.total) },
    {
      key: "estado",
      label: "Estado",
      render: (row) => <DeliveryStatusBadge status={row.estado} />,
    },
    {
      key: "actions",
      label: "Acciones",
      render: (row) => (
        <i
          className="fa-solid fa-eye"
          style={{ cursor: "pointer", color: "var(--texto-muted)" }}
          title="Ver detalle"
          onClick={() => setDetailDelivery(row)}
        />
      ),
    },
  ];

  return (
    <>
      <DataTable
        title="Entregas"
        description="Consulta el estado de las entregas a domicilio y la evidencia registrada por el repartidor."
        columns={columns}
        data={filtered}
        searchPlaceholder="Buscar por cliente..."
        emptyMessage="No se encontraron entregas."
        extraFilter={
          <div style={{ minWidth: "180px" }}>
            <FormSelect
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="Todos los estados"
              options={DELIVERY_STATUSES}
            />
          </div>
        }
      />

      <DeliveryDetailModal
        open={Boolean(detailDelivery)}
        onClose={() => setDetailDelivery(null)}
        delivery={detailDelivery}
      />
    </>
  );
}
