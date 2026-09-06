// src/features/admin/dashboard/pages/DashboardPage.jsx
import React from "react";
import KpiCard from "../../../../shared/components/KpiCard";
import BarChart from "../../../../shared/components/BarChart";
import TopProductsList from "../components/TopProductsList";
import { formatPrice } from "../../../../shared/utils/formatPrice";
import "./DashboardPage.css";

// TODO: reemplazar todo por datos reales del backend (features/admin/dashboard/services)
const KPIS = [
  { icon: "fa-clock", iconColor: "#F49505", value: "12", label: "Pedidos pendientes" },
  {
    icon: "fa-circle-check",
    iconColor: "#24943C",
    value: "48",
    label: "Pedidos entregados",
    delta: { text: "5% menos respecto al mes anterior", positive: false },
  },
  {
    icon: "fa-sack-dollar",
    iconColor: "var(--primario)",
    value: formatPrice(7850000),
    label: "Ingresos del mes",
    delta: { text: "10% más respecto al mes anterior", positive: true },
  },
  { icon: "fa-star", iconColor: "var(--primario)", value: "Caja Amor de Fresa", label: "Producto más vendido" },
];

const SALES_BY_WEEKDAY = [
  { label: "Lun", value: 42 },
  { label: "Mar", value: 58 },
  { label: "Mié", value: 30 },
  { label: "Jue", value: 74 },
  { label: "Vie", value: 50 },
  { label: "Sáb", value: 68 },
  { label: "Dom", value: 60 },
];

const SALES_BY_MONTH = [
  { label: "Ene", value: 20 }, { label: "Feb", value: 24 }, { label: "Mar", value: 18 },
  { label: "Abr", value: 22 }, { label: "May", value: 16 }, { label: "Jun", value: 40 },
  { label: "Jul", value: 38 }, { label: "Ago", value: 36 }, { label: "Sep", value: 42 },
  { label: "Oct", value: 39 }, { label: "Nov", value: 44 }, { label: "Dic", value: 41 },
];

const TOP_PRODUCTS = [
  { name: "Caja Amor de Fresa", sold: 86 },
  { name: "Corazón de Chocolate", sold: 64 },
  { name: "Dulce Antojo", sold: 51 },
  { name: "Fresas Rosadas", sold: 37 },
  { name: "Caja Especial Cumpleaños", sold: 29 },
];

export default function DashboardPage() {
  const handleExport = () => {
    console.log("TODO: exportar reporte (PDF/Excel)");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">¡Bienvenida a ChocoBerry!</h1>
          <p className="dashboard-subtitle">Aquí tienes un resumen del comportamiento de tu negocio.</p>
        </div>
        <button type="button" className="btn-export" onClick={handleExport}>
          <i className="fa-solid fa-download" />
          Exportar reporte
        </button>
      </div>

      <div className="row dashboard-kpis">
        {KPIS.map((kpi) => (
          <div key={kpi.label} className="col-12 col-sm-6 col-lg-3 dashboard-col">
            <KpiCard {...kpi} />
          </div>
        ))}
      </div>

      <div className="row dashboard-row">
        <div className="col-12 col-lg-7 dashboard-col">
          <BarChart title="Ventas por semana" data={SALES_BY_WEEKDAY} />
        </div>
        <div className="col-12 col-lg-5 dashboard-col">
          <TopProductsList products={TOP_PRODUCTS} />
        </div>
      </div>

      <div className="row dashboard-row">
        <div className="col-12 dashboard-col">
          <BarChart title="Ventas por mes" data={SALES_BY_MONTH} />
        </div>
      </div>
    </div>
  );
}