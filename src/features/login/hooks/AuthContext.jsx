// src/features/login/hooks/useAuth.jsx (o AuthContext.jsx según tu estructura)
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Inicializamos leyendo directamente de localStorage para que la sesión sobreviva a los cambios de ruta
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('chocoberry_user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error al leer localStorage:", error);
      return null;
    }
  });

  // Sincronizamos cualquier cambio de usuario con localStorage de forma automática
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('chocoberry_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('chocoberry_user');
      }
    } catch (error) {
      console.error("Error al escribir en localStorage:", error);
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chocoberry_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
}