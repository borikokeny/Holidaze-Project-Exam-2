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

  if (user.role === "manager") {
    return <p className="flex items-center p-2 ps-10 text-gray-700">I am a Venue Manager</p>;
  }

  return (
    <button
    onClick={upgradeToManager}
    className="p-2 bg-stone-300 text-white rounded hover:bg-orange-300"
    >
      Turn me to Venue Manager
      {/* <span className="">In order to add a Venue, you need to upgrade to Manager</span> */}
    </button>
  )
};

export default ManagerButton;
