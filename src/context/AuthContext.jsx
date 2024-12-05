import React, { createContext, useContext, useState, useEffect } from "react";
import { Children } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const upgradeToManager = () => {
    if (user) {
      const updatedUser = { ...user, role: "manager" };
      setUser(updatedUser);
      localStorage.setItem("profile", JSON.stringify(updatedUser))
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToManager }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
