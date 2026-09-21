// src/features/cart/components/ShippingForm.jsx
import React from "react";
import { OutlinedInput, Select, MenuItem } from "@mui/material";
import DatePicker, { addDaysISO } from "../../../shared/components/DatePicker";
import FormRadioGroup from "../../../shared/components/FormRadioGroup";
import { MUNICIPIOS } from "../data/shipping";
import { PICKUP_ADDRESS, PICKUP_SCHEDULE } from "../data/pickupInfo";
import "./ShippingForm.css";

// El pedido no puede ser para hoy ni mañana (mínimo 2 días de anticipación),
// ni para más de 20 días a futuro.
const MIN_DELIVERY_DATE = addDaysISO(2);
const MAX_DELIVERY_DATE = addDaysISO(20);

const DELIVERY_METHOD_OPTIONS = [
  { value: "domicilio", label: "Sí" },
  { value: "recogida", label: "No" },
];

function formatDisplayDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

/**
 * @param {object} props
 * @param {object} props.values - { fullName, deliveryDate, deliveryMethod, address, municipio, instructions }
 * @param {(field: string, value: string) => void} props.onChange
 * @param {string} [props.fullNameError]
 * @param {string} [props.deliveryDateError]
 * @param {string} [props.deliveryMethodError]
 * @param {string} [props.municipioError]
 * @param {string} [props.addressError]
 */
export default function ShippingForm({
  values,
  onChange,
  fullNameError,
  deliveryDateError,
  deliveryMethodError,
  municipioError,
  addressError,
}) {
  const { fullName, address, municipio, instructions, deliveryDate, deliveryMethod } = values;

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

      <FormRadioGroup
        label="¿Deseas entrega a domicilio?"
        required
        orientation="row"
        value={deliveryMethod}
        onChange={(v) => onChange("deliveryMethod", v)}
        options={DELIVERY_METHOD_OPTIONS}
        error={deliveryMethodError}
      />

      {deliveryMethod === "domicilio" && (
        <>
          <div className="form-field">
            <label className="form-label">Dirección *</label>
            <OutlinedInput
              className={`form-input ${addressError ? "has-error" : ""}`}
              fullWidth
              placeholder="Ej. Calle 10 # 43 - 21, Torre 2 Apto 402"
              value={address}
              onChange={(e) => onChange("address", e.target.value)}
            />
            {addressError && <div className="form-error">{addressError}</div>}
          </div>

          <div className="form-field">
            <label className="form-label">Municipio de entrega *</label>
            <Select
              className={`form-input form-select ${municipioError ? "has-error" : ""}`}
              fullWidth
              displayEmpty
              value={municipio}
              onChange={(e) => onChange("municipio", e.target.value)}
            >
              <MenuItem value="">
                <span className="form-select-placeholder">Selecciona un municipio</span>
              </MenuItem>
              {MUNICIPIOS.map((m) => (
                <MenuItem key={m.value} value={m.value}>
                  {m.label}
                </MenuItem>
              ))}
            </Select>
            {municipioError && <div className="form-error">{municipioError}</div>}
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

          <div className="delivery-hours-hint">
            <i className="fa-solid fa-clock" />
            Puedes esperar tu pedido el día de entrega escogido en estos horarios: <strong>{PICKUP_SCHEDULE}</strong>
          </div>
        </>
      )}

      {deliveryMethod === "recogida" && (
        <div className="pickup-info">
          <i className="fa-solid fa-store" />
          <div>
            <div className="pickup-info-title">Recoges tu pedido en tienda</div>
            <p className="pickup-info-text">
              Puedes recoger tu pedido el <strong>{formatDisplayDate(deliveryDate) || "día que elijas"}</strong>,
              en horario de <strong>{PICKUP_SCHEDULE}</strong>, en:
            </p>
            <p className="pickup-info-address">{PICKUP_ADDRESS}</p>
          </div>
        </div>
      )}
    </div>
  );
}