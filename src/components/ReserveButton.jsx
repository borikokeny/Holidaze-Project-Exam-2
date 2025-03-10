import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import { LoginForm } from "../pages";

const ReserveButton = ({ onReserve }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserveClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      onReserve(); 
    }
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    alert("You are now logged in!");
  };

  return (
    <>
      <button
        onClick={handleReserveClick}
        className="p-2 bg-gray-700 text-white rounded-none hover:bg-gray-900 w-full"
      >
        Reserve
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold">You need to be logged in</h2>
          <p className="mb-4">Please log in to reserve a venue.</p>
          <LoginForm redirect={false} onLoginSuccess={handleLoginSuccess} />
        </Modal>
      )}
    </>
  );
};

export default ReserveButton;

