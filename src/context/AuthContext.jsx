import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("profile");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("profile");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    console.log("Login Response Data:", userData);
    const updatedUser = {
      ...userData,
      venueManager: userData.venueManager ?? false,
    };
    setUser(updatedUser);
    localStorage.setItem("profile", JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("profile");
  };

  const upgradeToManager = () => {
    if (user) {
      const updatedUser = { ...user, venueManager: true };
      setUser(updatedUser);
      localStorage.setItem("profile", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToManager }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
