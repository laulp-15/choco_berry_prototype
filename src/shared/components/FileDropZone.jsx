// src/shared/components/FileDropzone.jsx
import React, { useRef, useState } from "react";
import "./FileDropzone.css";

/**
 * Zona de arrastrar-y-soltar (o clic) para subir una imagen. Reutilizada en
 * el comprobante de pago del checkout y ahora también en el admin de pedidos.
 *
 * @param {object} props
 * @param {File | null} props.file
 * @param {(file: File | null) => void} props.onChange
 * @param {string} [props.label]
 * @param {string} [props.hint]
 * @param {string} [props.error]
 */
export default function FileDropzone({
  file,
  onChange,
  label = "Subir archivo",
  hint = "Arrastra tu archivo aquí o haz clic para buscarlo",
  error,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (fileList) => {
    const f = fileList?.[0];
    if (f && f.type.startsWith("image/")) onChange(f);
  };

  if (file) {
    return (
      <div className="dropzone-preview">
        <img src={URL.createObjectURL(file)} alt={label} />
        <div className="dropzone-preview-info">
          <span className="dropzone-preview-name">{file.name}</span>
          <button type="button" className="dropzone-remove" onClick={() => onChange(null)}>
            <i className="fa-solid fa-xmark" />
            Quitar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`dropzone ${isDragging ? "dragging" : ""} ${error ? "has-error" : ""}`}
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
        <div className="dropzone-title">{label}</div>
        <div className="dropzone-subtitle">{hint}</div>
        <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => handleFiles(e.target.files)} />
      </div>
      {error && <div className="form-error">{error}</div>}
    </div>
  );
}