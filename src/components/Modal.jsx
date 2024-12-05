import React from "react";

const Modal = ({ children, onClose }) => {
  const handleAction = () => {
    alert("You succeed!");
    onClose();
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white p-6 rounded shadow-lg">
        <button
          onClick={handleAction}
          className="btn-primary absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        <button
          onClick={onClose}
          className="btn-secondary absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
