import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ManagerButton = () => {
  const { user, upgradeToManager } = useAuth();
  const navigate = useNavigate();

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
    navigate("/VenueForm");
    return <p className="flex items-center text-teal-500">Congratulations! You are now a Venue Manager. You can start managing venues right away.</p>;
    
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