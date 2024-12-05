import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import LoginForm from "../pages/auth/login";
import ManagerButton from "./ManagerButton";
import VenueForm from "./VenueForm";

const AddAVenueButton = () => {
  const { user } = useAuth();
  const [modalContent, setModalContent] = useState(null);

  const handleVenueClick = (e) => {
    e.preventDefault(); 

    if (!user) {
      setModalContent({
        title: "Login Required",
        content: (
          <LoginForm
            redirect={false}
            onLoginSuccess={() => handleAction("login")}
          />
        ),
      });
      return;
    }

    if (user.role !== "manager") {
      setModalContent({
        title: "Want to manage venues? Upgrade to a Venue Manager and unlock features like creating and editing your venues!",
        content: (
          <ManagerButton />
        )
      })
      return;
    }

    setModalContent({
      title: "Add Your Venue",
      content: (
        <VenueForm
          redirect={false}
          onLoginSuccess={() => handleAction("publish")}
        />
      ),
    });
  };

  const handleAction = (action) => {
    switch (action) {
      case "login":
        alert("Login successful (placeholder)!");
        break;
      case "upgrade":
        alert("Upgraded to Venue Manager (placeholder)!");
        break;
      case "publish":
        alert("You published your Venue!");
        break;
      default:
        break;
    }
    // If the user is logged in and a manager, open the modal
    setIsModalOpen(true);
  };


  return (
    <>
      <Link className="flex items-center p-2 ps-10 text-gray-700 rounded-md hover:bg-gray-200" onClick={handleVenueClick}>
        Add a venue
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
