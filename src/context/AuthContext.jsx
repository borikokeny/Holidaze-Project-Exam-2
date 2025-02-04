import React, { createContext, useContext, useState, useEffect } from "react";
import { updateProfile, viewProfile } from "../api/profile";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("profile");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = localStorage.getItem("profile");
        if (!storedUser) return;

        const { name } = JSON.parse(storedUser);
        if (!name) throw new Error("Profile name is missing");

        const profileData = await viewProfile(name);
        if (!profileData || !profileData.data) throw new Error("Invalid profile data");

        setUser(profileData.data); 
        localStorage.setItem("profile", JSON.stringify(profileData.data));
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const login = (userData) => {
    if (!userData.name) {
      console.error("Login response missing user name.");
      return;
    }

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

  const upgradeToManager = async () => {
    if (!user || !user.name) {
      console.error("User is not logged in or missing name.");
      return;
    }

    try {
      const updatedProfile = await updateProfile({
        name: user.name,
        venueManager: true,
      });

      setUser(updatedProfile.data);
      localStorage.setItem("profile", JSON.stringify(updatedProfile.data));
    } catch (error) {
      console.error("Failed to upgrade user to manager:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, upgradeToManager }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

