// src/features/login/hooks/useAuth.jsx
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from "react";

/**
 * Subproceso de gestión de acceso — mock de backend en localStorage.
 *
 * IMPORTANTE PARA EL EQUIPO:
 * Todo esto simula el API real mientras no exista backend. El día que
 * el backend esté listo, solo hay que reemplazar el CUERPO de cada
 * función (login, register, requestPasswordReset, changePassword) por
 * el fetch/axios correspondiente — la forma en que las páginas llaman
 * a useAuth() no cambia.
 *
 * Datos gestionados: correo, contraseña (hasheada solo en apariencia
 * aquí, NUNCA en texto plano en un backend real), rol.
 * Roles soportados: "cliente" | "administrador" | "repartidor".
 * El registro público SIEMPRE crea rol "cliente"; administrador y
 * repartidor se asumen creados internamente (panel admin), por eso
 * no hay selector de rol en el formulario de registro.
 *
 * Reglas de seguridad implementadas (según el brief del subproceso):
 * - Validación de credenciales contra la "base" de usuarios.
 * - Bloqueo temporal tras múltiples intentos fallidos (5 intentos → 30s).
 * - Registro de accesos (log simple en localStorage) para auditoría.
 */

const USERS_KEY = "cb_users";
const SESSION_KEY = "cb_session"; // persiste si el usuario marcó "Recordarme"
const ACCESS_LOG_KEY = "cb_access_log";
const MAX_ATTEMPTS = 5;
const LOCK_MS = 30_000;

const AuthContext = createContext(null);

// --- Usuarios DEMO, uno por rol, para poder probar todo el flujo sin backend ---
const SEED_USERS = [
  {
    id: "u-cliente-demo",
    fullName: "Isabella López",
    email: "cliente@chocoberry.com",
    password: "Cliente123!",
    role: "cliente",
    address: "Calle 13 #45-67, Barrio Centro",
  },
  {
    id: "u-admin-demo",
    fullName: "Admin Chocoberry",
    email: "admin@chocoberry.com",
    password: "Admin123!",
    role: "administrador",
    address: "",
  },
  {
    id: "u-repartidor-demo",
    fullName: "Carlos Ruiz",
    email: "repartidor@chocoberry.com",
    password: "Repartidor123!",
    role: "repartidor",
    address: "",
  },
];

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
      return SEED_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return SEED_USERS;
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function readSession() {
  try {
    const raw =
      localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function logAccess(entry) {
  try {
    const raw = localStorage.getItem(ACCESS_LOG_KEY);
    const log = raw ? JSON.parse(raw) : [];
    log.unshift({ ...entry, date: new Date().toISOString() });
    localStorage.setItem(ACCESS_LOG_KEY, JSON.stringify(log.slice(0, 50)));
  } catch {
    /* auditoría best-effort: si falla, no debe romper el login */
  }
}

// Intentos fallidos y bloqueo, por correo.
function getAttempts(email) {
  try {
    const raw = localStorage.getItem(`cb_attempts_${email.toLowerCase()}`);
    return raw ? JSON.parse(raw) : { count: 0, lockUntil: 0 };
  } catch {
    return { count: 0, lockUntil: 0 };
  }
}
function setAttempts(email, data) {
  localStorage.setItem(
    `cb_attempts_${email.toLowerCase()}`,
    JSON.stringify(data)
  );
}
function clearAttempts(email) {
  localStorage.removeItem(`cb_attempts_${email.toLowerCase()}`);
}

// Simula la latencia de un API real para que los estados de "cargando"
// de los formularios tengan sentido.
function delay(ms = 700) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readSession());

  // Si otra pestaña cierra/abre sesión, nos enteramos.
  useEffect(() => {
    function onStorage(e) {
      if (e.key === SESSION_KEY) {
        setUser(readSession());
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(async ({ email, password, remember }) => {
    await delay();
    const normalizedEmail = email.trim().toLowerCase();
    const { count, lockUntil } = getAttempts(normalizedEmail);

    if (lockUntil && Date.now() < lockUntil) {
      const secondsLeft = Math.ceil((lockUntil - Date.now()) / 1000);
      const err = new Error(
        `Demasiados intentos fallidos. Intenta de nuevo en ${secondsLeft}s.`
      );
      err.code = "LOCKED";
      err.secondsLeft = secondsLeft;
      throw err;
    }

    const users = readUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    if (!found || found.password !== password) {
      const nextCount = count + 1;
      const shouldLock = nextCount >= MAX_ATTEMPTS;
      setAttempts(normalizedEmail, {
        count: shouldLock ? 0 : nextCount,
        lockUntil: shouldLock ? Date.now() + LOCK_MS : 0,
      });
      logAccess({ email: normalizedEmail, result: "fallido" });

      if (shouldLock) {
        const err = new Error(
          `Superaste el número de intentos permitidos. Cuenta bloqueada temporalmente por ${
            LOCK_MS / 1000
          }s.`
        );
        err.code = "LOCKED";
        err.secondsLeft = LOCK_MS / 1000;
        throw err;
      }

      const err = new Error("Correo o contraseña incorrectos.");
      err.code = "INVALID_CREDENTIALS";
      err.attemptsLeft = MAX_ATTEMPTS - nextCount;
      throw err;
    }

    clearAttempts(normalizedEmail);
    logAccess({ email: normalizedEmail, result: "exitoso" });

    const sessionUser = {
      id: found.id,
      fullName: found.fullName,
      email: found.email,
      role: found.role,
    };
    setUser(sessionUser);
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    // por higiene, que no quede sesión duplicada en el otro storage
    (remember ? sessionStorage : localStorage).removeItem(SESSION_KEY);

    return sessionUser;
  }, []);

  const register = useCallback(async ({ fullName, email, password, address }) => {
    await delay();
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      const err = new Error("Ya existe una cuenta registrada con ese correo.");
      err.code = "EMAIL_TAKEN";
      throw err;
    }

    const newUser = {
      id: `u-${Date.now()}`,
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
      role: "cliente", // registro público → siempre cliente
      address: address?.trim() || "",
    };
    writeUsers([...users, newUser]);
    logAccess({ email: normalizedEmail, result: "registro" });

    return { id: newUser.id, email: newUser.email, role: newUser.role };
  }, []);

  const requestPasswordReset = useCallback(async (email) => {
    await delay();
    const normalizedEmail = email.trim().toLowerCase();
    const users = readUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === normalizedEmail
    );

    // Por seguridad NUNCA revelamos si el correo existe o no: siempre
    // "ok". Si existe, generamos un token de un solo uso (en un backend
    // real esto se envía por correo; aquí lo dejamos en consola para
    // poder probar el flujo completo sin servidor de correo).
    if (exists) {
      const token = Math.random().toString(36).slice(2, 10);
      localStorage.setItem(
        `cb_reset_${normalizedEmail}`,
        JSON.stringify({ token, expires: Date.now() + 15 * 60_000 })
      );
      // eslint-disable-next-line no-console
      console.info(
        `[DEMO] Enlace de recuperación para ${normalizedEmail}: /restablecer-contrasena?email=${encodeURIComponent(
          normalizedEmail
        )}&token=${token}`
      );
    }
    return { ok: true };
  }, []);

  const changePassword = useCallback(
    async ({ currentPassword, newPassword }) => {
      await delay();
      if (!user) {
        const err = new Error("Debes iniciar sesión para cambiar tu contraseña.");
        err.code = "NOT_AUTHENTICATED";
        throw err;
      }
      const users = readUsers();
      const idx = users.findIndex((u) => u.id === user.id);
      if (idx === -1 || users[idx].password !== currentPassword) {
        const err = new Error("La contraseña actual no es correcta.");
        err.code = "INVALID_CURRENT_PASSWORD";
        throw err;
      }
      users[idx] = { ...users[idx], password: newPassword };
      writeUsers(users);
      logAccess({ email: user.email, result: "cambio_contrasena" });
      return { ok: true };
    },
    [user]
  );

  const logout = useCallback(() => {
    if (user) logAccess({ email: user.email, result: "cierre_sesion" });
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      role: user?.role ?? null,
      login,
      register,
      requestPasswordReset,
      changePassword,
      logout,
    }),
    [user, login, register, requestPasswordReset, changePassword, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
