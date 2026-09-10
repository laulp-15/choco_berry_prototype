// src/features/login/pages/LoginPage.jsx

import React, { useEffect, useState } from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthLayout from "../components/AuthLayout";
import AuthInput from "../components/AuthInput";
import GoogleButton from "../components/GoogleButton";
import Navbar from "../../../shared/components/Navbar";

import { useAuth } from "../hooks/useAuth";

import {
  validateEmail,
  validateLoginPassword,
} from "../utils/validators";

/**
 * Login.
 *
 * - Incluye el Header (Navbar) superior.
 * - Valida correo y contraseña.
 * - Gestiona el bloqueo temporal tras intentos fallidos.
 * - Permite recordar la sesión.
 * - Redirige según el rol del usuario.
 * - Respeta la ruta protegida desde la que llegó el usuario.
 */
export default function LoginPage() {
  const { login } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);

  const [lockSeconds, setLockSeconds] = useState(0);

  /* ============================================================
     BLOQUEO TEMPORAL
     ============================================================ */

  useEffect(() => {
    if (lockSeconds <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => {
      setLockSeconds((current) =>
        current <= 1 ? 0 : current - 1
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, [lockSeconds]);

  /* ============================================================
     HELPERS
     ============================================================ */

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

  function normalizeEmail(value) {
    return value.trim().toLowerCase();
  }

  function validateField(field, values = form) {
    switch (field) {
      case "email":
        return validateEmail(
          normalizeEmail(values.email)
        );

      case "password":
        return validateLoginPassword(
          values.password
        );

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
  }

  function validateAll() {
    const normalizedEmail = normalizeEmail(
      form.email
    );

    const nextErrors = {
      email: validateEmail(normalizedEmail),
      password: validateLoginPassword(
        form.password
      ),
    };

    setErrors(nextErrors);

    return Object.values(nextErrors).every(
      (error) => !error
    );
  }

  /* ============================================================
     SUBMIT
     ============================================================ */

  async function handleSubmit(event) {
    event.preventDefault();

    if (loading || lockSeconds > 0) {
      return;
    }

    setServerError("");

    if (!validateAll()) {
      return;
    }

    const email = normalizeEmail(form.email);

    setLoading(true);

    try {
      const sessionUser = await login({
        email,
        password: form.password,
        remember: form.remember,
      });

      const redirectTo =
        location.state?.from ||
        defaultRouteForRole(
          sessionUser?.role
        );

      navigate(redirectTo, {
        replace: true,
      });
    } catch (error) {
      if (error?.code === "LOCKED") {
        const seconds =
          Number(error?.secondsLeft) || 0;

        setLockSeconds(seconds);

        setServerError(
          error?.message ||
            "Has alcanzado el límite de intentos. Inténtalo nuevamente más tarde."
        );
      } else {
        setServerError(
          error?.message ||
            "No fue posible iniciar sesión. Verifica tus datos e inténtalo nuevamente."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  const isLocked = lockSeconds > 0;

  const isDisabled =
    loading || isLocked;

  return (
    <>
      <Navbar />
      <AuthLayout
        variant="split"
        image="/img/Login/IMG_0516.jpg"
        imageAlt="Fresas cubiertas de chocolate Chocoberry"
        title="¡Bienvenido!"
        subtitle="Inicia sesión para continuar"
        footer={
          <>
            ¿No tienes cuenta?{" "}
            <Link to="/registro">
              Regístrate
            </Link>
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

              <span>
                {serverError}

                {isLocked && (
                  <>
                    {" "}
                    <strong>
                      ({lockSeconds}s)
                    </strong>
                  </>
                )}
              </span>
            </div>
          )}

          {/* ======================================================
              CORREO
              ====================================================== */}

          <AuthInput
            label="Correo electrónico"
            name="email"
            type="email"
            icon="envelope"
            placeholder="tu correo@email.com"
            value={form.email}
            onChange={(value) =>
              updateField("email", value)
            }
            onBlur={() =>
              handleBlur("email")
            }
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
            placeholder="••••••••"
            value={form.password}
            onChange={(value) =>
              updateField("password", value)
            }
            onBlur={() =>
              handleBlur("password")
            }
            error={errors.password}
            autoComplete="current-password"
            disabled={isDisabled}
            required
          />

          {/* ======================================================
              RECORDAR + RECUPERAR
              ====================================================== */}

          <div className="auth-remember-row">
            <label htmlFor="remember-session">
              <input
                id="remember-session"
                name="remember"
                type="checkbox"
                checked={form.remember}
                onChange={(event) =>
                  updateField(
                    "remember",
                    event.target.checked
                  )
                }
                disabled={isDisabled}
              />

              <span>
                Recordarme
              </span>
            </label>

            <Link
              to="/recuperar-contrasena"
              className="auth-inline-link"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* ======================================================
              BOTÓN
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

                Ingresando...
              </>
            ) : isLocked ? (
              <>
                <i
                  className="fa-solid fa-lock"
                  aria-hidden="true"
                />

                Bloqueado ({lockSeconds}s)
              </>
            ) : (
              <>
                <i
                  className="fa-solid fa-right-to-bracket"
                  aria-hidden="true"
                />

                Ingresar
              </>
            )}
          </button>

          {/* ======================================================
              SEPARADOR
              ====================================================== */}

          <div
            className="auth-divider"
            role="separator"
            aria-label="O continúa con"
          >
            <span>
              o continúa con
            </span>
          </div>

          {/* ======================================================
              GOOGLE
              ====================================================== */}

          <GoogleButton />
        </form>
      </AuthLayout>
    </>
  );
}

/**
 * Ruta inicial según el rol.
 */
function defaultRouteForRole(role) {
  switch (role) {
    case "administrador":
      return "/admin";

    case "repartidor":
      return "/admin/pedidos";

    default:
      return "/productos";
  }
}