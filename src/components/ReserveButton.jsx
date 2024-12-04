import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import LoginForm from "../pages/auth/login";

const ReserveButton = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReserveClick = () => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      alert("Venue reserved successfully!");
    }
  };

  const handleLoginSuccess = () => {
    setIsModalOpen(false); // Close the modal after successful login
    alert("You are now logged in!");
  };

  return (
    <>
      <button
        onClick={handleReserveClick}
        className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Reserve
      </button>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold">You need to be logged in</h2>
          <p className="mb-4">Please log in to reserve a venue.</p>
          <LoginForm redirect={false} onLoginSuccess={handleLoginSuccess} />
          {/* <form>
            <input
              type="email"
              placeholder="Email"
              className="mb-2 p-2 border rounded w-full"
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="mb-4 p-2 border rounded w-full"
              required
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded w-full"
            >
              Log In
            </button>
          </form> */}
        </Modal>
      )}
    </>
  );
};

export default ReserveButton;
