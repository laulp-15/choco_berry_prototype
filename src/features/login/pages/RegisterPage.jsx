// ============================================================
// src/features/login/pages/RegisterPage.jsx
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import GoogleButton from "../components/GoogleButton";

import Navbar from "../../../shared/components/Navbar";

import { useAuth } from "../hooks/useAuth";

import {
  validateEmail,
  validateFullName,
  validatePassword,
  validateConfirmPassword,
  validateTermsAccepted,
} from "../utils/validators";


// ============================================================
// VALIDACIÓN LOCAL DEL TELÉFONO
// ============================================================

function validatePhone(phone) {
  const cleanPhone = phone.replace(/\s+/g, "");

  if (!cleanPhone) {
    return "El número de teléfono es obligatorio.";
  }

  if (!/^\+?\d{7,15}$/.test(cleanPhone)) {
    return "Ingresa un número de teléfono válido.";
  }

  return "";
}


// ============================================================
// REQUISITOS DE CONTRASEÑA
// ============================================================

function getPasswordRequirements(password) {
  return [
    {
      key: "length",
      label: "Mínimo 8 caracteres",
      valid: password.length >= 8,
    },
    {
      key: "uppercase",
      label: "Una mayúscula",
      valid: /[A-Z]/.test(password),
    },
    {
      key: "number",
      label: "Un número",
      valid: /\d/.test(password),
    },
    {
      key: "special",
      label: "Un carácter especial",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
}


// ============================================================
// PÁGINA DE REGISTRO
// ============================================================

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // ============================================================
  // ESTADO DEL FORMULARIO
  // ============================================================

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    acceptTerms: false,
  });

  // ============================================================
  // ESTADO DE ERRORES
  // ============================================================

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  // ============================================================
  // NORMALIZAR EMAIL
  // ============================================================

  function normalizeEmail(value) {
    return value.trim().toLowerCase();
  }

  // ============================================================
  // ACTUALIZAR CAMPO
  // ============================================================

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

  // ============================================================
  // VALIDAR CAMPO INDIVIDUAL
  // ============================================================

  function validateField(field, values = form) {
    switch (field) {
      case "fullName":
        return validateFullName(values.fullName);

      case "phone":
        return validatePhone(values.phone);

      case "email":
        return validateEmail(normalizeEmail(values.email));

      case "password":
        return validatePassword(values.password);

      case "confirmPassword":
        return validateConfirmPassword(
          values.password,
          values.confirmPassword
        );

      case "address":
        if (!values.address.trim()) {
          return "La dirección es obligatoria.";
        }
        return "";

      case "acceptTerms":
        return validateTermsAccepted(values.acceptTerms);

      default:
        return "";
    }
  }

  // ============================================================
  // BLUR
  // ============================================================

  function handleBlur(field) {
    const error = validateField(field);

    setErrors((current) => ({
      ...current,
      [field]: error,
    }));
  }

  // ============================================================
  // CAMBIO DE CONTRASEÑA
  // ============================================================

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

  // ============================================================
  // TÉRMINOS
  // ============================================================

  function handleTermsChange(checked) {
    updateField("acceptTerms", checked);

    setErrors((current) => ({
      ...current,
      acceptTerms: validateTermsAccepted(checked),
    }));
  }

  // ============================================================
  // VALIDAR TODO
  // ============================================================

  function validateAll() {
    const values = {
      ...form,
      email: normalizeEmail(form.email),
    };

    const nextErrors = {
      fullName: validateFullName(values.fullName),
      phone: validatePhone(values.phone),
      email: validateEmail(values.email),
      password: validatePassword(values.password),
      confirmPassword: validateConfirmPassword(
        values.password,
        values.confirmPassword
      ),
      address: !values.address.trim()
        ? "La dirección es obligatoria."
        : "",
      acceptTerms: validateTermsAccepted(values.acceptTerms),
    };

    setErrors(nextErrors);

    return Object.values(nextErrors).every((error) => !error);
  }

  // ============================================================
  // SUBMIT
  // ============================================================

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
      fullName: form.fullName.trim(),
      email: normalizeEmail(form.email),
      phone: form.phone.trim(),
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

  // Requisitos dinámicos en tiempo real (se obtiene solo el primero pendiente o el estado completo)
  const passwordRequirements = getPasswordRequirements(form.password);
  const currentReq = passwordRequirements.find((req) => !req.valid);
  const allValid = passwordRequirements.every((req) => req.valid);

  return (
    <>
      <Navbar />

      <AuthLayout
        variant="split"
        image="/img/Login/login.jpeg"
        imageAlt="Caja de fresas cubiertas de chocolate Chocoberry"
        title="¡Regístrate!"
        subtitle="Completa tus datos para comenzar"
        footer={
          <>
            ¿Ya tienes una cuenta? <Link to="/login">Ingresar</Link>
          </>
        }
      >
        <form
          className="auth-panel-body auth-register-form"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={loading}
        >
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

          {/* NOMBRE COMPLETO */}
          <div className="auth-register-field">
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
          </div>

          {/* TELÉFONO */}
          <div className="auth-register-field">
            <AuthInput
              label="Número de teléfono"
              type="tel"
              name="phone"
              icon="phone"
              placeholder="Ej. 300 123 4567"
              value={form.phone}
              onChange={(value) => updateField("phone", value)}
              onBlur={() => handleBlur("phone")}
              error={errors.phone}
              autoComplete="tel"
              disabled={isDisabled}
              required
            />
          </div>

          {/* CORREO ELECTRÓNICO */}
          <div className="auth-register-field">
            <AuthInput
              label="Correo electrónico"
              type="email"
              name="email"
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
          </div>

          {/* CONTRASEÑA */}
          <div className="auth-register-field">
            <AuthInput
              label="Contraseña"
              type="password"
              name="password"
              icon="lock"
              placeholder="Crea una contraseña"
              value={form.password}
              onChange={handlePasswordChange}
              onBlur={() => handleBlur("password")}
              error={errors.password}
              autoComplete="new-password"
              disabled={isDisabled}
              required
            />

            {/* VALIDACIÓN EN TIEMPO REAL: 1 POR 1 EN UNA SOLA FILA */}
            <div className="auth-password-requirements">
              {form.password && (
                allValid ? (
                  <span className="auth-password-requirement is-valid">
                    <i className="fa-solid fa-circle-check" aria-hidden="true" />
                    Contraseña segura
                  </span>
                ) : (
                  currentReq && (
                    <span className="auth-password-requirement is-invalid">
                      <i className="fa-solid fa-circle-xmark" aria-hidden="true" />
                      Falta: {currentReq.label}
                    </span>
                  )
                )
              )}
            </div>
          </div>

          {/* CONFIRMAR CONTRASEÑA */}
          <div className="auth-register-field">
            <AuthInput
              label="Confirmar contraseña"
              type="password"
              name="confirmPassword"
              icon="lock"
              placeholder="Confirma tu contraseña"
              value={form.confirmPassword}
              onChange={(value) => updateField("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              error={errors.confirmPassword}
              autoComplete="new-password"
              disabled={isDisabled}
              required
            />
          </div>

          {/* DIRECCIÓN DE ENTREGA */}
          <div className="auth-register-field">
            <AuthInput
              label="Dirección de entrega"
              name="address"
              icon="location-dot"
              placeholder="Ej. Calle 13 #45 - 67"
              value={form.address}
              onChange={(value) => updateField("address", value)}
              onBlur={() => handleBlur("address")}
              error={errors.address}
              autoComplete="street-address"
              disabled={isDisabled}
              required
            />
          </div>

          {/* TÉRMINOS Y CONDICIONES */}
          <div className="auth-terms-group">
            <label className="auth-checkbox-row">
              <input
                type="checkbox"
                checked={form.acceptTerms}
                onChange={(e) => handleTermsChange(e.target.checked)}
                disabled={isDisabled}
              />
              <span>
                Acepto los <Link to="/terms">Términos y Condiciones</Link> y la{" "}
                <Link to="/privacy">Política de Privacidad</Link>.
              </span>
            </label>
            {errors.acceptTerms && (
              <div
                className="auth-password-requirement is-invalid"
                style={{ marginTop: "2px" }}
              >
                <i className="fa-solid fa-circle-xmark" aria-hidden="true" />
                {errors.acceptTerms}
              </div>
            )}
          </div>

          {/* BOTÓN DE REGISTRO */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={isDisabled}
          >

              <>
                <i className="fa-solid fa-user-plus" aria-hidden="true" />
                Registrarse
              </>

          </button>

          {/* DIVIDER */}
          <div className="auth-divider">
            <span>o continúa con</span>
          </div>

          {/* BOTÓN GOOGLE */}
          <div className="auth-register-google">
            <GoogleButton disabled={isDisabled} />
          </div>
        </form>
      </AuthLayout>
    </>
  );
}