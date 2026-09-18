// src/features/cart/components/PaymentSection.jsx
import React from "react";
import { Select, MenuItem } from "@mui/material";
import FileDropzone from "../../../shared/components/FileDropzone";
import { PAYMENT_METHODS } from "../data/paymentMethods";
import { NEQUI_ACCOUNT } from "../data/paymentInfo";
import "./PaymentSection.css";

/**
 * @param {object} props
 * @param {string} props.paymentMethod
 * @param {(value: string) => void} props.onPaymentMethodChange
 * @param {File | null} props.proofFile
 * @param {(file: File | null) => void} props.onProofFileChange
 * @param {string} [props.paymentMethodError]
 * @param {string} [props.proofFileError]
 */
export default function PaymentSection({
  paymentMethod,
  onPaymentMethodChange,
  proofFile,
  onProofFileChange,
  paymentMethodError,
  proofFileError,
}) {
  return (
    <div className="checkout-section">
      <div className="checkout-section-title">
        <i className="fa-solid fa-credit-card" />
        Información de Pago
      </div>

      <p className="payment-intro">
        Por favor, realiza la transferencia y adjunta tu comprobante para procesar tu pedido.
      </p>
      <div className="payment-nequi">
        <i className="fa-solid fa-phone" />
        Transferencias a Nequi: <strong>{NEQUI_ACCOUNT}</strong>
      </div>

      <div className="form-field">
        <label className="form-label">Medio de pago *</label>
        <Select
          className={`form-input form-select ${paymentMethodError ? "has-error" : ""}`}
          fullWidth
          displayEmpty
          value={paymentMethod}
          onChange={(e) => onPaymentMethodChange(e.target.value)}
        >
          <MenuItem value="">
            <span className="form-select-placeholder">Selecciona un medio de pago</span>
          </MenuItem>
          {PAYMENT_METHODS.map((m) => (
            <MenuItem key={m.value} value={m.value}>
              {m.label}
            </MenuItem>
          ))}
        </Select>
        {paymentMethodError && <div className="form-error">{paymentMethodError}</div>}
      </div>

      <div className="form-field">
        <label className="form-label">Comprobante de pago *</label>
        <FileDropzone
          file={proofFile}
          onChange={onProofFileChange}
          label="Subir comprobante de pago"
          error={proofFileError}
        />
      </div>
    </div>
  );
}