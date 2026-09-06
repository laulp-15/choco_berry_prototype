// src/features/cart/components/PaymentSection.jsx
import React, { useRef, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { PAYMENT_METHODS } from "../data/PaymentMethods";
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
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList) => {
    const file = fileList?.[0];
    if (file && file.type.startsWith("image/")) {
      onProofFileChange(file);
    }
  };

  return (
    <div className="checkout-section">
      <div className="checkout-section-title">
        <i className="fa-solid fa-credit-card" />
        Información de Pago
      </div>

      <p className="payment-intro">
        Por favor, realiza la transferencia y adjunta tu comprobante para procesar tu pedido.
      </p>

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

        {proofFile ? (
          <div className="proof-preview">
            <img src={URL.createObjectURL(proofFile)} alt="Comprobante de pago" />
            <div className="proof-preview-info">
              <span className="proof-preview-name">{proofFile.name}</span>
              <button
                type="button"
                className="proof-remove"
                onClick={() => onProofFileChange(null)}
              >
                <i className="fa-solid fa-xmark" />
                Quitar
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`dropzone ${isDragging ? "dragging" : ""} ${proofFileError ? "has-error" : ""}`}
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              handleFiles(e.dataTransfer.files);
            }}
          >
            <div className="dropzone-icon">
              <i className="fa-solid fa-file-import" />
            </div>
            <div className="dropzone-title">Subir comprobante de pago</div>
            <div className="dropzone-subtitle">Arrastra tu archivo aquí o haz clic para buscarlo</div>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        )}
        {proofFileError && <div className="form-error">{proofFileError}</div>}
      </div>
    </div>
  );
}