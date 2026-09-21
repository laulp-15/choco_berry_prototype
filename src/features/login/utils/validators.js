// src/features/login/utils/validators.js

/**
 * Validaciones puras (sin JSX) para los formularios de acceso.
 * Cada validate* devuelve "" cuando el campo es válido, o el mensaje
 * de error a mostrar cuando no lo es. Así los formularios solo hacen:
 *   const error = validateEmail(email);
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Solo letras (con tildes/ñ) y espacios, mínimo 2 palabras razonable.
const NAME_REGEX = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+(?:\s[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+)+$/;

export function validateEmail(value) {
  if (!value?.trim()) return "El correo electrónico es obligatorio.";
  if (!EMAIL_REGEX.test(value.trim())) return "Ingresa un correo válido.";
  return "";
}

export function validateFullName(value) {
  if (!value?.trim()) return "El nombre completo es obligatorio.";
  if (value.trim().length < 3) return "El nombre es demasiado corto.";
  if (!NAME_REGEX.test(value.trim()))
    return "Ingresa tu nombre y apellido (solo letras).";
  return "";
}

/**
 * Reglas de contraseña, alineadas 1:1 con el checklist de la vista
 * "¡Cambia tu contraseña!" del prototipo:
 * mínimo 8 caracteres, una mayúscula, un número y un carácter especial.
 */
export function getPasswordChecks(value = "") {
  return {
    minLength: value.length >= 8,
    hasUpper: /[A-Z]/.test(value),
    hasNumber: /[0-9]/.test(value),
    hasSpecial: /[^A-Za-z0-9]/.test(value),
  };
}

export function isPasswordStrong(value = "") {
  const checks = getPasswordChecks(value);
  return Object.values(checks).every(Boolean);
}

export function validatePassword(value) {
  if (!value) return "La contraseña es obligatoria.";
  if (!isPasswordStrong(value)) {
    return "La contraseña no cumple con los requisitos mínimos.";
  }
  return "";
}

export function validateLoginPassword(value) {
  // En login NO se re-exige la política completa (una contraseña
  // antigua podría no cumplirla), solo que no venga vacía.
  if (!value) return "La contraseña es obligatoria.";
  return "";
}

export function validateConfirmPassword(password, confirmPassword) {
  if (!confirmPassword) return "Confirma tu contraseña.";
  if (password !== confirmPassword) return "Las contraseñas no coinciden.";
  return "";
}

export function validateTermsAccepted(accepted) {
  if (!accepted) return "Debes aceptar los Términos y la Política de Privacidad.";
  return "";
}
