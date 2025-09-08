// src/context/AuthProvider.jsx
import { useState } from "react";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // Guardará la info del usuario

  // Login: guarda el usuario en el estado
  const login = (userData) => {
    setUser(userData);
  };

  // Logout: borra al usuario
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
