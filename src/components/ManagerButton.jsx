import React from "react";
import { useAuth } from "../context/AuthContext";

const ManagerButton = () => {
  const { user, upgradeToManager } = useAuth();

  if (!user) {
    return (
      <button
      className="p-2 bg-stone-300 text-white rounded hover:bg-orange-300"
      onClick={() => alert("To become a manager, you need to log in first.")}
      >
        Turn me to Venue Manager
      </button>
    )
  }

  if (user.venueManager === true) {
    return <p className="flex items-center text-teal-500">Venue Manager</p>;
  }

  return (
    <button
    onClick={upgradeToManager}
    className="p-2 mt-2 w-full bg-teal-600 text-white rounded-none hover:bg-black"
    >
      Turn me to Venue Manager
    </button>
  )
};

export default ManagerButton;