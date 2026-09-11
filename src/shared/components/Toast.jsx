
// src/shared/components/Toast.jsx

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  Snackbar,
  Alert,
} from "@mui/material";

import "./Toast.css";

/**
 * Sistema global de notificaciones.
 *
 * Uso:
 *
 * const { showToast } = useToast();
 *
 * showToast({
 *   type: "success",
 *   title: "Usuario creado",
 *   message: "El usuario fue creado correctamente.",
 * });
 *
 * Tipos soportados:
 *
 * - success
 * - error
 * - warning
 * - info
 */

const ToastContext = createContext(null);

// -----------------------------------------------------------------------------
// NORMALIZAR TIPO
// -----------------------------------------------------------------------------

function normalizeSeverity(type) {
  if (
    type === "success" ||
    type === "error" ||
    type === "warning" ||
    type === "info"
  ) {
    return type;
  }

  return "info";
}

// -----------------------------------------------------------------------------
// TOAST VISUAL
// -----------------------------------------------------------------------------

export default function Toast({
  toast,
  onClose,
}) {
  return (
    <Snackbar
      className="app-toast"
      open={Boolean(toast)}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      {toast ? (
        <Alert
          onClose={onClose}
          severity={
            normalizeSeverity(
              toast.type ||
                toast.severity
            )
          }
          variant="filled"
          className="app-toast-alert"
        >
          {toast.title ? (
            <strong
              style={{
                display: "block",
                marginBottom: "2px",
              }}
            >
              {toast.title}
            </strong>
          ) : null}

          {toast.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}

// -----------------------------------------------------------------------------
// PROVIDER
// -----------------------------------------------------------------------------

export function ToastProvider({
  children,
}) {
  const [toast, setToast] =
    useState(null);

  // ---------------------------------------------------------------------------
  // CERRAR TOAST
  // ---------------------------------------------------------------------------

  const hideToast =
    useCallback(() => {
      setToast(null);
    }, []);

  // ---------------------------------------------------------------------------
  // MOSTRAR TOAST
  // ---------------------------------------------------------------------------

  const showToast =
    useCallback((options) => {
      if (!options) {
        return;
      }

      /*
       * Permitimos tanto:
       *
       * showToast({
       *   type: "success",
       *   title: "...",
       *   message: "..."
       * })
       *
       * como:
       *
       * showToast({
       *   severity: "success",
       *   message: "..."
       * })
       */

      setToast({
        type:
          options.type ||
          options.severity ||
          "info",

        severity:
          options.severity ||
          options.type ||
          "info",

        title:
          options.title || "",

        message:
          options.message || "",
      });
    }, []);

  // ---------------------------------------------------------------------------
  // CONTEXT VALUE
  // ---------------------------------------------------------------------------

  const value = useMemo(
    () => ({
      toast,
      showToast,
      hideToast,
    }),
    [
      toast,
      showToast,
      hideToast,
    ]
  );

  return (
    <ToastContext.Provider
      value={value}
    >
      {children}

      <Toast
        toast={toast}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// HOOK
// -----------------------------------------------------------------------------

export function useToast() {
  const context =
    useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast debe usarse dentro de <ToastProvider>"
    );
  }

  return context;
}

