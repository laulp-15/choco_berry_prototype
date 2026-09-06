// src/features/cart/components/ShippingForm.jsx
import React from "react";
import { OutlinedInput, Select, MenuItem } from "@mui/material";
import { MUNICIPIOS } from "../data/Shipping";
import "./ShippingForm.css";

/**
 * @param {object} props
 * @param {object} props.values - { fullName, address, municipio, instructions }
 * @param {(field: string, value: string) => void} props.onChange
 * @param {string} [props.fullNameError]
 */
export default function ShippingForm({ values, onChange, fullNameError }) {
  const { fullName, address, municipio, instructions } = values;

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
            <span className="form-select-placeholder">Recojo en persona</span>
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
          placeholder="Instrucciones especiales para el repartidor..."
          value={instructions}
          onChange={(e) => onChange("instructions", e.target.value)}
        />
      </div>
    </div>
  );
}