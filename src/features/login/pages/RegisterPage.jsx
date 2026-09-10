
// src/features/login/pages/RegisterPage.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import GoogleButton from "../components/GoogleButton";
import PasswordStrengthChecklist from "../components/PasswordStrengthChecklist";

import { useAuth } from "../hooks/useAuth";

import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateConfirmPassword,
  validateTermsAccepted,
} from "../utils/validators";

/**
 * Registro público.
 *
 * Los usuarios registrados desde este formulario
 * siempre se crean con rol "cliente".
 *
 * Los roles administrativos se asignan internamente.
 */
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  /* ============================================================
     HELPERS
     ============================================================ */

  function normalizeEmail(value) {
    return value.trim().toLowerCase();
  }

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: "",
    }));

    setServerError("");
  }

  function validateField(field, values = form) {
    switch (field) {
      case "fullName":
        return validateFullName(values.fullName);

      case "email":
        return validateEmail(normalizeEmail(values.email));

      case "password":
        return validatePassword(values.password);

      case "confirmPassword":
        return validateConfirmPassword(
          values.password,
          values.confirmPassword
        );

      case "acceptTerms":
        return validateTermsAccepted(values.acceptTerms);

      default:
        return "";
    }
  }

  function handleBlur(field) {
    const error = validateField(field);

    setErrors((current) => ({
      ...current,
      [field]: error,
    }));

    if (field === "password") {
      setPasswordFocused(false);
    }
  }

  function handlePasswordChange(value) {
    setForm((current) => ({
      ...current,
      password: value,
    }));

    setErrors((current) => ({
      ...current,
      password: "",
      confirmPassword: current.confirmPassword
        ? validateConfirmPassword(value, current.confirmPassword)
        : "",
    }));

    setServerError("");
  }

  function handleTermsChange(checked) {
    updateField("acceptTerms", checked);

    setErrors((current) => ({
      ...current,
      acceptTerms: validateTermsAccepted(checked),
    }));
  }

  /* ============================================================
     VALIDACIÓN COMPLETA
     ============================================================ */

  function validateAll() {
    const values = {
      ...form,
      email: normalizeEmail(form.email),
    };

    const nextErrors = {
      fullName: validateFullName(values.fullName),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirmPassword: validateConfirmPassword(
        values.password,
        values.confirmPassword
      ),
      acceptTerms: validateTermsAccepted(values.acceptTerms),
    };

    setErrors(nextErrors);

    return Object.values(nextErrors).every((error) => !error);
  }

  /* ============================================================
     SUBMIT
     ============================================================ */

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }

    setServerError("");

    if (!validateAll()) {
      return;
    }

    const normalizedForm = {
      ...form,
      email: normalizeEmail(form.email),
      fullName: form.fullName.trim(),
      address: form.address.trim(),
    };

    setLoading(true);

    try {
      await register(normalizedForm);

      navigate("/login", {
        replace: true,
        state: {
          registered: true,
        },
      });
    } catch (error) {
      if (error?.code === "EMAIL_TAKEN") {
        setErrors((current) => ({
          ...current,
          email:
            error.message ||
            "Este correo electrónico ya está registrado.",
        }));
      } else {
        setServerError(
          error?.message ||
            "No fue posible crear la cuenta. Inténtalo nuevamente."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const isDisabled = loading;

  return (
    <AuthLayout
      variant="split"
      image="/img/Login/login.jpeg"
      imageAlt="Caja de fresas cubiertas de chocolate Chocoberry"
      

      title="¡Registrate!"
      subtitle="Completa tus datos para comenzar"
      footer={
        <>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login">Ingresar</Link>
        </>
      }
    >
      <form
        className="auth-panel-body"
        onSubmit={handleSubmit}
        noValidate
        aria-busy={loading}
      >
        {/* ======================================================
            ERROR GENERAL
            ====================================================== */}

        {serverError && (
          <div
            className="auth-banner auth-banner--error"
            role="alert"
            aria-live="assertive"
          >
            <i
              className="fa-solid fa-circle-exclamation"
              aria-hidden="true"
            />

            <span>{serverError}</span>
          </div>
        )}

        {/* ======================================================
            NOMBRE
            ====================================================== */}

        <AuthInput
          label="Nombre completo"
          name="fullName"
          icon="user"
          placeholder="Ej. Isabella López"
          value={form.fullName}
          onChange={(value) => updateField("fullName", value)}
          onBlur={() => handleBlur("fullName")}
          error={errors.fullName}
          autoComplete="name"
          disabled={isDisabled}
          required
        />

        {/* ======================================================
            CORREO
            ====================================================== */}

        <AuthInput
          label="Correo electrónico"
          name="email"
          type="email"
          icon="envelope"
          placeholder="Ej. isabella@email.com"
          value={form.email}
          onChange={(value) => updateField("email", value)}
          onBlur={() => handleBlur("email")}
          error={errors.email}
          autoComplete="email"
          disabled={isDisabled}
          required
        />

        {/* ======================================================
            CONTRASEÑA
            ====================================================== */}

        <AuthInput
          label="Contraseña"
          name="password"
          type="password"
          icon="lock"
          placeholder="Crea una contraseña"
          value={form.password}
          onChange={handlePasswordChange}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => handleBlur("password")}
          error={errors.password}
          autoComplete="new-password"
          disabled={isDisabled}
          required
        />

        {(passwordFocused || form.password) && (
          <PasswordStrengthChecklist
            password={form.password}
          />
        )}

        {/* ======================================================
            CONFIRMAR CONTRASEÑA
            ====================================================== */}

        <AuthInput
          label="Confirmar contraseña"
          name="confirmPassword"
          type="password"
          icon="lock"
          placeholder="Confirma tu contraseña"
          value={form.confirmPassword}
          onChange={(value) =>
            updateField("confirmPassword", value)
          }
          onBlur={() => handleBlur("confirmPassword")}
          error={errors.confirmPassword}
          autoComplete="new-password"
          disabled={isDisabled}
          required
        />

        {/* ======================================================
            DIRECCIÓN
            ====================================================== */}

        <AuthInput
          label="Dirección de entrega (opcional)"
          name="address"
          icon="location-dot"
          placeholder="Ej. Calle 13 #45-67, Barrio Centro"
          value={form.address}
          onChange={(value) => updateField("address", value)}
          autoComplete="street-address"
          disabled={isDisabled}
        />

        {/* ======================================================
            TÉRMINOS
            ====================================================== */}

        <div className="auth-terms-group">
          <label className="auth-checkbox-row">
            <input
              id="accept-terms"
              name="acceptTerms"
              type="checkbox"
              checked={form.acceptTerms}
              onChange={(event) =>
                handleTermsChange(event.target.checked)
              }
              disabled={isDisabled}
              aria-invalid={Boolean(errors.acceptTerms)}
              aria-describedby={
                errors.acceptTerms
                  ? "accept-terms-error"
                  : undefined
              }
              required
            />

            <span>
              Acepto los{" "}
              <a href="#terminos">
                Términos y Condiciones
              </a>{" "}
              y la{" "}
              <a href="#privacidad">
                Política de Privacidad
              </a>
              .
            </span>
          </label>

          {errors.acceptTerms && (
            <span
              id="accept-terms-error"
              className="auth-field-error"
              role="alert"
            >
              <i
                className="fa-solid fa-circle-exclamation"
                aria-hidden="true"
              />

              <span>{errors.acceptTerms}</span>
            </span>
          )}
        </div>

        {/* ======================================================
            REGISTRAR
            ====================================================== */}

        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isDisabled}
          aria-disabled={isDisabled}
        >
          {loading ? (
            <>
              <i
                className="fa-solid fa-spinner fa-spin"
                aria-hidden="true"
              />

              Creando cuenta...
            </>
          ) : (
            <>
              <i
                className="fa-solid fa-user-plus"
                aria-hidden="true"
              />

              Registrarse
            </>
          )}
        </button>

        {/* ======================================================
            GOOGLE
            ====================================================== */}

        <div
          className="auth-divider"
          role="separator"
          aria-label="O continúa con"
        >
          <span>o continúa con</span>
        </div>

        <GoogleButton />
      </form>
    </AuthLayout>
  );
}

