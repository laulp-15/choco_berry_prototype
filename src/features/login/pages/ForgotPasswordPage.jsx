// src/features/login/pages/ForgotPasswordPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import Navbar from "../../../shared/components/Navbar";
import { useAuth } from "../hooks/useAuth";
import { validateEmail } from "../utils/validators";

const RESEND_COOLDOWN = 30;

/**
 * Recuperar contraseña — SOLO pide el correo y envía (simula) un enlace
 * de recuperación. Distinto de "Cambiar contraseña" (ChangePasswordPage),
 * que pide contraseña actual + nueva y requiere sesión iniciada.
 */
export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const timerRef = useRef(null);
  useEffect(() => {
    if (cooldown <= 0) return undefined;
    timerRef.current = setInterval(() => {
      setCooldown((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  async function handleSubmit(e) {
    e.preventDefault();
    const err = validateEmail(email);
    setError(err);
    if (err) return;

    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
      setCooldown(RESEND_COOLDOWN);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <AuthLayout
        variant="split"
        image="/img/Login/imagen.png"
        imageAlt="Caja de fresas cubiertas de chocolate Chocoberry"
        title="¿Olvidaste tu contraseña?"
        subtitle="No te preocupes, nos sucede a todos. Ingresa tu correo electrónico y te enviaremos un enlace para recuperarla."
        footer={
          <Link to="/login" className="auth-back-link">
            <i className="fa-solid fa-arrow-left-long" /> Volver al inicio de sesión
          </Link>
        }
      >
        {sent ? (
          <div className="auth-panel-body">
            <div className="auth-banner auth-banner--success" role="status">
              <i className="fa-solid fa-circle-check" />
              <span>
                Si <strong>{email}</strong> está registrado, te enviamos un enlace
                para restablecer tu contraseña. Revisa también la carpeta de spam.
              </span>
            </div>
            <button
              type="button"
              className="auth-inline-link"
              disabled={cooldown > 0}
              onClick={handleSubmit}
            >
              {cooldown > 0
                ? `Reenviar enlace en ${cooldown}s`
                : "¿No llegó? Reenviar enlace"}
            </button>
          </div>
        ) : (
          <form className="auth-panel-body" onSubmit={handleSubmit} noValidate>
            <AuthInput
              label="Correo electrónico"
              name="email"
              type="email"
              icon="envelope"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={setEmail}
              onBlur={() => setError(validateEmail(email))}
              error={error}
              autoComplete="email"
              required
            />

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <i className="fa-solid fa-clock" /> Enviando...
                </>
              ) : (
                "Enviar enlace de recuperación"
              )}
            </button>
          </form>
        )}
      </AuthLayout>
    </>
  );
}