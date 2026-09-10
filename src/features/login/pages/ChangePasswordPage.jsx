
// src/features/login/pages/ChangePasswordPage.jsx

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import PasswordStrengthChecklist from "../components/PasswordStrengthChecklist";

import { useAuth } from "../hooks/useAuth";
import {
  validatePassword,
  validateConfirmPassword,
} from "../utils/validators";

/**
 * Cambiar contraseña.
 *
 * Esta vista es diferente a "Recuperar contraseña":
 * - Requiere una sesión iniciada.
 * - Solicita la contraseña actual.
 * - Valida que la nueva contraseña sea diferente.
 */
export default function ChangePasswordPage() {
  const { isAuthenticated, changePassword } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  /**
   * Redirige al login después de cambiar la contraseña.
   */
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      navigate("/login");
    }, 1800);

    return () => clearTimeout(timer);
  }, [success, navigate]);

  /**
   * Actualiza un campo y elimina su error al corregirlo.
   */
  function setField(field, value) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setServerError("");
  }

  /**
   * Valida un campo individual.
   */
  function validateField(field, values = form) {
    switch (field) {
      case "currentPassword":
        return values.currentPassword
          ? ""
          : "Ingresa tu contraseña actual.";

      case "newPassword": {
        const passwordError = validatePassword(values.newPassword);

        if (passwordError) {
          return passwordError;
        }

        if (
          values.currentPassword &&
          values.newPassword === values.currentPassword
        ) {
          return "La nueva contraseña debe ser diferente a la actual.";
        }

        return "";
      }

      case "confirmPassword":
        return validateConfirmPassword(
          values.newPassword,
          values.confirmPassword
        );

      default:
        return "";
    }
  }

  /**
   * Valida un campo cuando el usuario sale del input.
   */
  function handleBlur(field) {
    const error = validateField(field);

    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));

    if (field === "newPassword") {
      setPasswordFocused(false);
    }
  }

  /**
   * Valida todo el formulario.
   */
  function validateAll() {
    const nextErrors = {
      currentPassword: validateField("currentPassword"),
      newPassword: validateField("newPassword"),
      confirmPassword: validateField("confirmPassword"),
    };

    setErrors(nextErrors);

    return Object.values(nextErrors).every((error) => !error);
  }

  /**
   * Envía el cambio de contraseña.
   */
  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) return;

    setServerError("");
    setSuccess(false);

    const isValid = validateAll();

    if (!isValid) return;

    setLoading(true);

    try {
      await changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setSuccess(true);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setErrors({});
    } catch (error) {
      if (error?.code === "INVALID_CURRENT_PASSWORD") {
        setErrors((prev) => ({
          ...prev,
          currentPassword:
            error.message || "La contraseña actual no es correcta.",
        }));
      } else {
        setServerError(
          error?.message ||
            "No fue posible actualizar la contraseña. Inténtalo nuevamente."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /**
   * Usuario sin sesión.
   */
  if (!isAuthenticated) {
    return (
      <AuthLayout
        variant="centered"
        title="Necesitas iniciar sesión"
        subtitle="Para cambiar tu contraseña primero debes ingresar a tu cuenta."
      >
        <div className="auth-panel-body">
          <Link
            to="/login"
            className="auth-submit-btn"
            style={{ textDecoration: "none" }}
          >
            <i className="fa-solid fa-right-to-bracket" />
            Iniciar sesión
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      variant="centered"
      title="¡Cambia tu contraseña!"
      subtitle="Protege tu cuenta creando una contraseña segura y diferente a la anterior."
      footer={
        <Link to="/login" className="auth-back-link">
          <i className="fa-solid fa-arrow-left-long" />
          Volver al inicio de sesión
        </Link>
      }
    >
      <form
        className="auth-panel-body"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={loading}
      >
        <div
          className="auth-form-description"
          aria-live="polite"
        >
          <i className="fa-solid fa-shield-halved" />
          <span>
            Por seguridad, confirma tu contraseña actual antes de continuar.
          </span>
        </div>

        {serverError && (
          <div
            className="auth-banner auth-banner--error"
            role="alert"
            aria-live="assertive"
          >
            <i className="fa-solid fa-circle-exclamation" />
            <span>{serverError}</span>
          </div>
        )}

        {success && (
          <div
            className="auth-banner auth-banner--success"
            role="status"
            aria-live="polite"
          >
            <i className="fa-solid fa-circle-check" />
            <span>
              Tu contraseña se actualizó correctamente. Redirigiendo...
            </span>
          </div>
        )}

        <AuthInput
          label="Contraseña actual"
          name="currentPassword"
          type="password"
          icon="lock"
          value={form.currentPassword}
          onChange={(value) => setField("currentPassword", value)}
          onBlur={() => handleBlur("currentPassword")}
          error={errors.currentPassword}
          autoComplete="current-password"
          disabled={loading || success}
          required
        />

        <AuthInput
          label="Nueva contraseña"
          name="newPassword"
          type="password"
          icon="lock"
          value={form.newPassword}
          onChange={(value) => setField("newPassword", value)}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => handleBlur("newPassword")}
          error={errors.newPassword}
          autoComplete="new-password"
          disabled={loading || success}
          required
        />

        {(passwordFocused || form.newPassword) && (
          <PasswordStrengthChecklist
            password={form.newPassword}
          />
        )}

        <AuthInput
          label="Confirmar nueva contraseña"
          name="confirmPassword"
          type="password"
          icon="lock"
          value={form.confirmPassword}
          onChange={(value) => setField("confirmPassword", value)}
          onBlur={() => handleBlur("confirmPassword")}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={loading || success}
          required
        />

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={loading || success}
        >
          {loading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin" />
              Actualizando...
            </>
          ) : success ? (
            <>
              <i className="fa-solid fa-check" />
              Contraseña actualizada
            </>
          ) : (
            <>
              <i className="fa-solid fa-key" />
              Actualizar contraseña
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}

