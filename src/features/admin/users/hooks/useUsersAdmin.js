
// src/features/admin/users/hooks/useUsersAdmin.js

import {
  useCallback,
  useState,
} from "react";

import {
  getUsersStore,
  setUsersStore,
} from "../../../login/hooks/useAuth";

import {
  INITIAL_ORDERS,
} from "../../orders/data/mockOrders";

/**
 * Subproceso de gestión de usuarios
 * (panel administrador).
 *
 * Lee y escribe la MISMA lista de usuarios
 * que utiliza el login.
 *
 * getUsersStore()
 * setUsersStore()
 *
 * vienen desde:
 *
 * features/login/hooks/useAuth.jsx
 *
 * Regla de negocio:
 *
 * No se puede eliminar un usuario que tenga
 * pedidos asociados.
 *
 * Como todavía no existe backend con relaciones
 * reales, se cruza el nombre del usuario contra
 * los pedidos mock.
 *
 * Cuando exista usuarioId real en pedidos,
 * reemplazar hasAssociatedOrders() por esa
 * consulta.
 */

// -----------------------------------------------------------------------------
// DELAY
// -----------------------------------------------------------------------------

function delay(ms = 500) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

// -----------------------------------------------------------------------------
// PEDIDOS ASOCIADOS
// -----------------------------------------------------------------------------

export function hasAssociatedOrders(user) {
  if (
    !user ||
    user.role !== "cliente"
  ) {
    return false;
  }

  const name =
    user.fullName
      ?.trim()
      .toLowerCase();

  if (!name) {
    return false;
  }

  return INITIAL_ORDERS.some(
    (order) =>
      order.cliente
        ?.trim()
        .toLowerCase() === name
  );
}

// -----------------------------------------------------------------------------
// HOOK
// -----------------------------------------------------------------------------

export default function useUsersAdmin() {
  // ---------------------------------------------------------------------------
  // ESTADO
  // ---------------------------------------------------------------------------

  const [users, setUsers] =
    useState(() =>
      getUsersStore()
    );

  const [loading, setLoading] =
    useState(false);

  // ---------------------------------------------------------------------------
  // RECARGAR USUARIOS
  // ---------------------------------------------------------------------------

  const reload = useCallback(
    () => {
      setUsers(
        getUsersStore()
      );
    },
    []
  );

  // ---------------------------------------------------------------------------
  // CREAR USUARIO
  // ---------------------------------------------------------------------------

  const createUser =
    useCallback(
      async ({
        fullName,
        email,
        password,
        role,
        active = true,
        address = "",
      }) => {
        setLoading(true);

        try {
          await delay();

          const current =
            getUsersStore();

          const normalizedEmail =
            email
              .trim()
              .toLowerCase();

          // Verificar correo duplicado
          if (
            current.some(
              (user) =>
                user.email
                  .toLowerCase() ===
                normalizedEmail
            )
          ) {
            const err = new Error(
              "Ya existe un usuario registrado con ese correo."
            );

            err.code =
              "EMAIL_TAKEN";

            throw err;
          }

          // Crear usuario
          const newUser = {
            id: `u-${Date.now()}`,

            fullName:
              fullName.trim(),

            email:
              normalizedEmail,

            password,

            role,

            address:
              address?.trim() || "",

            active,

            createdAt:
              new Date().toISOString(),
          };

          // Nueva lista
          const next = [
            ...current,
            newUser,
          ];

          // Guardar en localStorage
          setUsersStore(next);

          // Actualizar estado del hook
          setUsers(next);

          return newUser;
        } finally {
          setLoading(false);
        }
      },
      []
    );

  // ---------------------------------------------------------------------------
  // EDITAR USUARIO
  // ---------------------------------------------------------------------------

  const updateUser =
    useCallback(
      async (
        id,
        {
          fullName,
          email,
          password,
          role,
          active,
          address = "",
        }
      ) => {
        setLoading(true);

        try {
          await delay();

          const current =
            getUsersStore();

          const normalizedEmail =
            email
              .trim()
              .toLowerCase();

          // Verificar correo duplicado
          if (
            current.some(
              (user) =>
                user.id !== id &&
                user.email
                  .toLowerCase() ===
                  normalizedEmail
            )
          ) {
            const err = new Error(
              "Ya existe otro usuario registrado con ese correo."
            );

            err.code =
              "EMAIL_TAKEN";

            throw err;
          }

          // Actualizar usuario
          const next =
            current.map(
              (user) =>
                user.id === id
                  ? {
                      ...user,

                      fullName:
                        fullName.trim(),

                      email:
                        normalizedEmail,

                      role,

                      active,

                      address:
                        address?.trim() ||
                        "",

                      /*
                       * Si password viene vacío,
                       * conservamos la actual.
                       */
                      ...(password
                        ? { password }
                        : {}),
                    }
                  : user
            );

          // Guardar
          setUsersStore(next);

          // Actualizar estado
          setUsers(next);

          return next.find(
            (user) =>
              user.id === id
          );
        } finally {
          setLoading(false);
        }
      },
      []
    );

  // ---------------------------------------------------------------------------
  // ACTIVAR / DESACTIVAR USUARIO
  // ---------------------------------------------------------------------------

  const setActive =
    useCallback(
      async (id, active) => {
        const current =
          getUsersStore();

        const next =
          current.map(
            (user) =>
              user.id === id
                ? {
                    ...user,
                    active,
                  }
                : user
          );

        setUsersStore(next);

        setUsers(next);
      },
      []
    );

  // ---------------------------------------------------------------------------
  // ELIMINAR USUARIO
  // ---------------------------------------------------------------------------

  const removeUser =
    useCallback(
      async (id) => {
        const current =
          getUsersStore();

        const target =
          current.find(
            (user) =>
              user.id === id
          );

        // No existe
        if (!target) {
          return;
        }

        // No permitir eliminar
        // si tiene pedidos
        if (
          hasAssociatedOrders(
            target
          )
        ) {
          const err = new Error(
            "No se puede eliminar: este usuario tiene pedidos asociados en el sistema."
          );

          err.code =
            "HAS_ORDERS";

          throw err;
        }

        // Eliminar
        const next =
          current.filter(
            (user) =>
              user.id !== id
          );

        setUsersStore(next);

        setUsers(next);
      },
      []
    );

  // ---------------------------------------------------------------------------
  // BUSCAR USUARIO POR ID
  // ---------------------------------------------------------------------------

  const getUserById =
    useCallback(
      (id) => {
        // Primero buscamos en el estado
        const localUser =
          users.find(
            (user) =>
              user.id === id
          );

        if (localUser) {
          return localUser;
        }

        // Si no está, buscamos
        // directamente en localStorage
        return getUsersStore().find(
          (user) =>
            user.id === id
        );
      },
      [users]
    );

  // ---------------------------------------------------------------------------
  // RETURN
  // ---------------------------------------------------------------------------

  return {
    users,
    loading,

    reload,

    createUser,
    updateUser,
    setActive,
    removeUser,
    getUserById,
  };
}

