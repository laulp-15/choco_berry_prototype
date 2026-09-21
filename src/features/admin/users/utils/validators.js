// src/features/admin/users/utils/validators.js
import {
  validateFullName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../login/utils/validators";

// Se reexportan tal cual: la política de nombre/correo/contraseña del
// sistema es UNA sola, la definió el subproceso de login y este módulo
// no debería tener una regla distinta para el mismo dato.
export { validateFullName, validateEmail, validateConfirmPassword };

export function validateRole(value) {
  if (!value) return "Selecciona un rol.";
  return "";
}

/**
 * En "Crear usuario" la contraseña es obligatoria y debe cumplir la
 * política. En "Editar usuario" es opcional (CA_10: si se deja en
 * blanco, se conserva la actual) — pero si se escribe algo, sí debe
 * cumplir la política.
 */
export function validatePasswordForCreate(value) {
  return validatePassword(value);
}

export function validatePasswordForEdit(value) {
  if (!value) return "";
  return validatePassword(value);
}
