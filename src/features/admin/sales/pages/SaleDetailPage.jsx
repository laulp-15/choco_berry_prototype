// src/features/admin/sales/pages/SaleDetailPage.jsx
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import SaleReceipt from "../components/SaleReceipt";
import { INITIAL_ORDERS } from "../../orders/data/MockOrders";
import "./SaleDetailPage.css";

export default function SaleDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const sale = INITIAL_ORDERS.find((o) => String(o.id) === id);

  const handleGenerateReceipt = () => {
    console.log("TODO: generar comprobante digital (PDF) para el pedido", id);
  };

  const handleDownloadReceipt = () => {
    console.log("TODO: descargar comprobante digital (PDF) del pedido", id);
  };

  if (!sale) {
    return (
      <div>
        <p>No encontramos esta venta.</p>
        <button type="button" className="btn-download-receipt" onClick={() => navigate("/admin/ventas")}>
          <i className="fa-solid fa-arrow-left-long" />
          Volver a Ventas
        </button>
      </div>
    );
  }

  return (
    <div className="sale-detail-page">
      <div className="sale-detail-breadcrumb">
        <Link to="/admin/ventas">Ventas</Link>
        <span>/</span>
        <span>#{sale.id}</span>
      </div>

      <div className="sale-detail-header">
        <h1 className="sale-detail-title">Detalle de la Venta</h1>

        <div className="sale-detail-actions">
          <button type="button" className="btn-download-receipt" onClick={handleDownloadReceipt}>
            <i className="fa-solid fa-download" />
            Descargar comprobante
          </button>
          <button type="button" className="btn-generate-receipt" onClick={handleGenerateReceipt}>
            <i className="fa-solid fa-print" />
            Generar comprobante digital
          </button>
        </div>
      </div>

      <SaleReceipt sale={sale} />
    </div>
  );
}