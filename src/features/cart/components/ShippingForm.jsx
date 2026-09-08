// src/features/cart/components/ShippingForm.jsx
import React from "react";
import { OutlinedInput, Select, MenuItem } from "@mui/material";
import DatePicker, { addDaysISO } from "../../../shared/components/DatePicker";
import { MUNICIPIOS } from "../data/Shipping";
import "./ShippingForm.css";

// El pedido no puede ser para hoy ni mañana (mínimo 2 días de anticipación),
// ni para más de 20 días a futuro.
const MIN_DELIVERY_DATE = addDaysISO(2);
const MAX_DELIVERY_DATE = addDaysISO(20);

/**
 * @param {object} props
 * @param {object} props.values - { fullName, address, municipio, instructions, deliveryDate }
 * @param {(field: string, value: string) => void} props.onChange
 * @param {string} [props.fullNameError]
 * @param {string} [props.deliveryDateError]
 */
export default function ShippingForm({ values, onChange, fullNameError, deliveryDateError }) {
  const { fullName, address, municipio, instructions, deliveryDate } = values;

  return (
    <div className="checkout-section">
      <div className="checkout-section-title">
        <i className="fa-solid fa-truck-fast" />
        Detalles de Envío
      </div>

      <div className="form-field">
        <label className="form-label">Nombre completo *</label>
        <OutlinedInput
          className={`form-input ${fullNameError ? "has-error" : ""}`}
          fullWidth
          placeholder="Ej. Mariana Valenzuela"
          value={fullName}
          onChange={(e) => onChange("fullName", e.target.value)}
        />
        {fullNameError && <div className="form-error">{fullNameError}</div>}
      </div>

      <DatePicker
        label="Fecha de entrega"
        required
        value={deliveryDate}
        onChange={(v) => onChange("deliveryDate", v)}
        minDate={MIN_DELIVERY_DATE}
        maxDate={MAX_DELIVERY_DATE}
        error={deliveryDateError}
        hint="Debe ser al menos 2 días después de hoy, y máximo 20 días a futuro."
      />

      <div className="form-field">
        <label className="form-label">Dirección</label>
        <OutlinedInput
          className="form-input"
          fullWidth
          placeholder="Ej. Calle 10 # 43 - 21, Torre 2 Apto 402"
          value={address}
          onChange={(e) => onChange("address", e.target.value)}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Municipio de entrega</label>
        <Select
          className="form-input form-select"
          fullWidth
          displayEmpty
          value={municipio}
          onChange={(e) => onChange("municipio", e.target.value)}
        >
          <MenuItem value="">
            <span className="form-select-placeholder">Recojo en tienda / sin domicilio</span>
          </MenuItem>
          {MUNICIPIOS.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
      </div>

      <div className="form-field">
        <label className="form-label">Instrucciones de entrega</label>
        <OutlinedInput
          className="form-input"
          fullWidth
          multiline
          minRows={3}
          placeholder="Instrucciones especiales para el repartidor o detalles del regalo..."
          value={instructions}
          onChange={(e) => onChange("instructions", e.target.value)}
        />
      </div>
    </div>
  );
}