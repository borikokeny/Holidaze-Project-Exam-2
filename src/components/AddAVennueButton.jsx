import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { LoginForm } from "../pages";
import ManagerButton from "./ManagerButton";

const AddAVenueButton = () => {
  const { user } = useAuth();
  const [modalContent, setModalContent] = useState(null);
  const navigate = useNavigate();

  const handleVenueClick = (e) => {
    e.preventDefault();

    if (!user) {
      setModalContent({
        title: "Login Required",
        content: (
          <LoginForm
            redirect={false}
            onLoginSuccess={() => {
              setModalContent(null); 
              navigate("/VenueForm");
            }}
          />
        ),
      });
      return;
    }

    if (user.venueManager !== true) {
      setModalContent({
        title: "Want to manage venues?",
        content: (
          <ManagerButton
            onUpgradeSuccess={() => {
              console.log("Upgrade success handler called");
              setModalContent(null); 
              navigate("/VenueForm");
            }}
          />
        ),
      });
      return;
    }

    navigate("/VenueForm");
  };

  return (
    <>
      <Link
        className="grid text-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200"
        onClick={handleVenueClick}
      >
        Add a Venue
      </Link>

      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>
          <h2>{modalContent.title}</h2>
          {modalContent.content}
        </Modal>
      )}
    </>
  );
};

export default AddAVenueButton;