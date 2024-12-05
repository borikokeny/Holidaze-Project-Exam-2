import React from "react";
import { useAuth } from "../context/AuthContext";

const ManagerButton = () => {
  const { user, upgradeToManager } = useAuth();

  if (!user) {
    return <p>Please log in to access this feature.</p>;
  }

  if (user.role === "manager") {
    return <p className="flex items-center p-2 ps-10 text-gray-700">I am a Venue Manager</p>;
  }

  return (
    <button
    onClick={upgradeToManager}
    className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Upgrade to Manager
    </button>
  )
};

export default ManagerButton;
